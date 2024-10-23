package com.example.jobmaster.service.impl;

import com.example.jobmaster.dto.GoogleUserInfoDTO;
import com.example.jobmaster.dto.Request.ChangePasswordRequest;
import com.example.jobmaster.dto.Request.LoginRequest;
import com.example.jobmaster.dto.Request.RegisterRequest;
import com.example.jobmaster.dto.TokenDTO;
import com.example.jobmaster.dto.UserDTO;
import com.example.jobmaster.entity.*;
import com.example.jobmaster.exception.NotFoundException;
import com.example.jobmaster.repository.*;
import com.example.jobmaster.security.jwt.JWTUntil;
import com.example.jobmaster.service.IUserService;
import com.example.jobmaster.until.constants.ExceptionMessage;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.apache.catalina.User;
import org.apache.logging.log4j.message.SimpleMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Class: UserServiceImpl
 * Author: ACER
 * Date: 8/30/2024
 * Description: [Your description here]
 */

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private VerifyTokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    private final static String URL_GET_TOKEN_GOOGLE = "https://www.googleapis.com/oauth2/v3/userinfo";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender emailService;

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private JWTUntil jwtUntil;

    @Value("${app.url}")
    private String baseUrl;

    @Override
    public ResponseEntity loginByGoogle(String token,HttpServletRequest httpServletRequest) {
        RestTemplate restTemplate = new RestTemplate();
        String url = URL_GET_TOKEN_GOOGLE;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<GoogleUserInfoDTO> entity = new HttpEntity<>(headers);

        GoogleUserInfoDTO response = restTemplate.exchange(url, HttpMethod.GET, entity, GoogleUserInfoDTO.class).getBody();

        if (userRepository.existsByUsername(response.getEmail()) || userRepository.existsByGoogleId(response.getSub())) {
            UserEntity user = userRepository.findByUsername(response.getEmail());
            String origin = httpServletRequest.getHeader("Origin");
            if (origin.equals("http://localhost:3001")&&user.getUserInfoId()==null){
                throw new IllegalArgumentException("Tài khoản không hợp lệ");
            }
            if (origin.equals("http://localhost:3000")&&user.getEnterpriseId()==null){
                throw new IllegalArgumentException("Tài khoản không hợp lệ");
            }
            return ResponseEntity.ok(this.loginByGoogle(user));
        } else {
            UserEntity userEntity = new UserEntity();
            userEntity.setGoogleId(response.getSub());
            userEntity.setUsername(response.getEmail());

            return ResponseEntity.ok(this.registerByGoogle(userEntity));
        }
    }

    @Override
    @Transactional
    public TokenDTO registerEnterprise(RegisterRequest registerRequest) throws MessagingException {
        if (userRepository.existsByUsername(registerRequest.getEmail())) {
            throw new RuntimeException("Tài khoản đã tồn tại");
        }

        if (registerRequest.getIsConsumer()) {
            RoleEntity roleEntity = roleRepository.findById(2)
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            Set<RoleEntity> roleEntities = new HashSet<>(Arrays.asList(roleEntity));

            UserEntity user = UserEntity.builder()
                    .username(registerRequest.getEmail())
                    .fullName(registerRequest.getFullName())
                    .gender(registerRequest.getGender())
                    .isActive(UserEnum.WAITING_ACTIVE.name())
                    .password(passwordEncoder.encode(registerRequest.getPassword()))
                    .roles(roleEntities)
                    .build();

            user = userRepository.save(user); // Lưu để lấy ID của user

            UserInfoEntity userInfoEntity = new UserInfoEntity();
            userInfoEntity.setUserId(user.getId());
            userInfoEntity = userInfoRepository.save(userInfoEntity);

            user = userRepository.findById(user.getId()).get();
            user.setUserInfoId(userInfoEntity.getUserId());
            userRepository.save(user);

            return TokenDTO.builder()
                    .userId(user.getId())
                    .token(jwtUntil.generateToken(user))
                    .build();
        }

        RoleEntity roleEntity = roleRepository.findById(1)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        Set<RoleEntity> roleEntities = new HashSet<>(Arrays.asList(roleEntity));

        // Lưu UserEntity trước để có ID
        UserEntity user = UserEntity.builder()
                .username(registerRequest.getEmail())
                .fullName(registerRequest.getFullName())
                .gender(registerRequest.getGender())
                .isActive(UserEnum.WAITING_ACTIVE.name())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .roles(roleEntities)
                .build();

        user = userRepository.save(user); // Lưu để lấy ID của user

        // Tạo EnterpriseEntity với userId
        EnterpriseEntity enterpriseEntity = EnterpriseEntity.builder()
                .companyName(registerRequest.getCompanyName())
                .city(registerRequest.getCity())
                .district(registerRequest.getDistrict())
                .isActive(UserEnum.INACTIVE.name())
                .userId(user.getId()) // Sử dụng ID của user sau khi đã lưu
                .build();

        enterpriseEntity = enterpriseRepository.save(enterpriseEntity);

        // Cập nhật enterpriseId trong user
        user.setEnterpriseId(enterpriseEntity.getId());
        user = userRepository.save(user);

        this.sendEmail(user.getUsername());

        return TokenDTO.builder()
                .userId(user.getId())
                .token(jwtUntil.generateToken(user))
                .build();
    }

    @Override
    public String sendEmail(String email) throws MessagingException {
        UserEntity user = userRepository.findByUsername(email);
        VerifyTokenEntity token = new VerifyTokenEntity(user);
        // Gửi email xác thực
        String recipientName = user.getFullName();
        String confirmationLink = baseUrl + "verify?token=" + token.getToken();
        String emailContent = buildEmailContent(recipientName, confirmationLink);

        this.sendEmail(user.getUsername(), "Xác thực email", emailContent);
        return "success";
    }

    @Override
    public TokenDTO login(LoginRequest loginRequest, HttpServletRequest httpServletRequest) {
        UserEntity user = userRepository.findByUsername(loginRequest.getEmail());
        String origin = httpServletRequest.getHeader("Origin");
        System.out.println(origin);
        if (origin.equals("http://localhost:3001")&&user.getUserInfoId()==null){
            throw new IllegalArgumentException("Tài khoản không hợp lệ");
        }
        if (origin.equals("http://localhost:3000")&&user.getEnterpriseId()==null){
            throw new IllegalArgumentException("Tài khoản không hợp lệ");
        }
        if (user == null) {
            throw new IllegalArgumentException("Tài khoản không tồn tại");
        }
        if (user.getIsActive().equals(UserEnum.WAITING_ACTIVE.name())) {
            System.out.println();
            throw new IllegalArgumentException("Tài khoản chưa xác thực");
        }
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Mật khẩu không khớp");
        }
        return TokenDTO.builder()
                .userId(user.getId())
                .token(jwtUntil.generateToken(user))
                .build();
    }

    @Override
    public String confirmToken(String token) {
        VerifyTokenEntity verificationToken = tokenRepository.findByToken(token);
        if (verificationToken == null) {
            return "Invalid token";
        }

        UserEntity user = verificationToken.getUser();
        user.setIsActive(UserEnum.ACTIVE.name());
        userRepository.save(user);

        tokenRepository.delete(verificationToken);  // Xóa token sau khi xác thực thành công
        return "Email verified successfully!";
    }

    public void sendEmail(String to, String subject, String content) throws MessagingException {
        MimeMessage mimeMessage = emailService.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        helper.setText(content, true); // `true` để cho phép gửi nội dung HTML
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setFrom("tlufood.career@gmail.com");

        emailService.send(mimeMessage);
    }

    public String buildEmailContent(String recipientName, String confirmationLink) {
        return "<!DOCTYPE html>" +
                "<html lang='vi'>" +
                "<head>" +
                "<meta charset='UTF-8'>" +
                "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                "<title>Xác thực tài khoản</title>" +
                "<style>" +
                "  body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; }" +
                "  .email-container { background-color: #ffffff; padding: 20px; margin: 30px auto; width: 600px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }" +
                "  h2 { color: #444444; }" +
                "  p { font-size: 16px; line-height: 1.6; }" +
                "  .button { display: inline-block; padding: 15px 25px; margin-top: 20px; background-color: #e63946; color: white; text-decoration: none; border-radius: 5px; font-size: 16px; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='email-container'>" +
                "  <h2>Kính gửi Quý khách hàng " + recipientName + ",</h2>" +
                "  <p>Cảm ơn Quý khách đã tin tưởng và lựa chọn dịch vụ của chúng tôi. Chúng tôi gửi email này để cải thiện trải nghiệm người dùng và tăng tính bảo mật cho tài khoản của Quý khách.</p>" +
                "  <p>Vui lòng nhấn vào nút dưới đây để xác thực tài khoản của bạn:</p>" +
                "  <a href='" + confirmationLink + "' class='button'>Xác thực</a>" +
                "  <p>Nếu bạn cần hỗ trợ thêm, vui lòng liên hệ với chúng tôi qua các thông tin bên dưới:</p>" +
                "  <p><strong>Hotline CSKH:</strong> (024) 7107 9799</p>" +
                "  <p><strong>Email:</strong> cskh@jobmaster.vn</p>" +
                "  <p>Trân trọng,<br/>Đội ngũ Jobmaster</p>" +
                "</div>" +
                "</body>" +
                "</html>";
    }

    private TokenDTO loginByGoogle(UserEntity userEntity) {
        String token = jwtUntil.generateToken(userEntity);
        return TokenDTO.builder()
                .userId(userEntity.getId())
                .token(token)
                .build();
    }

    private TokenDTO registerByGoogle(UserEntity userEntity) {
        RoleEntity roleEntity = roleRepository.findById(1)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        Set<RoleEntity> roleEntities = new HashSet<>(Arrays.asList(roleEntity));
        userEntity.setRoles(roleEntities);
        UserEntity user = userRepository.save(userEntity);

        EnterpriseEntity enterpriseEntity = EnterpriseEntity
                .builder()
                .userId(user.getId())
                .build();
        enterpriseEntity = enterpriseRepository.save(enterpriseEntity);
        user.setEnterpriseId(enterpriseEntity.getId());
        user = userRepository.save(user);
        return TokenDTO.builder()
                .userId(user.getId())
                .token(jwtUntil.generateToken(user))
                .build();
    }

    @Override
    public UserDTO getUserByToken(String token) {
        String username = jwtUntil.getUsernameFromToken(token.substring(7));
        UserEntity userEntity = userRepository.findByUsername(username);
        if (userEntity == null) {
            throw new NotFoundException(ExceptionMessage.USER_NOT_FOUND);
        }
        return UserDTO.builder()
                .id(userEntity.getId())
                .username(userEntity.getUsername())
                .gender(userEntity.getGender())
                .fullName(userEntity.getFullName())
                .build();
    }

    @Override
    public UserDTO updateUser(String id, UserDTO userDTO) {
        UserEntity userEntity = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ExceptionMessage.USER_NOT_FOUND));
        userEntity.setGender(userDTO.getGender());
        userEntity.setFullName(userDTO.getFullName());
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            userEntity.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
        userRepository.save(userEntity);
        return userDTO;
    }

    @Override
    public void updatePassword(String token, ChangePasswordRequest changePasswordRequest) {
        String username = jwtUntil.getUsernameFromToken(token.substring(7));
        UserEntity userEntity = userRepository.findByUsername(username);
        if (userEntity == null) {
            throw new NotFoundException(ExceptionMessage.USER_NOT_FOUND);
        }
        if (userEntity.getGoogleId() != null && userEntity.getPassword() == null) {
            userEntity.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
        } else {
            if (changePasswordRequest.getOldPassword() == null || !passwordEncoder.matches(changePasswordRequest.getOldPassword(), userEntity.getPassword())) {
                throw new IllegalArgumentException(ExceptionMessage.PASSWORD_INVALID);
            }
            userEntity.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
        }
        userRepository.save(userEntity);
    }
}
