package com.example.jobmaster.service.impl;

import com.example.jobmaster.dto.GoogleUserInfoDTO;
import com.example.jobmaster.dto.Request.RegisterRequest;
import com.example.jobmaster.dto.TokenDTO;
import com.example.jobmaster.entity.EnterpriseEntity;
import com.example.jobmaster.entity.RoleEntity;
import com.example.jobmaster.entity.UserEntity;
import com.example.jobmaster.entity.UserEnum;
import com.example.jobmaster.repository.EnterpriseRepository;
import com.example.jobmaster.repository.RoleRepository;
import com.example.jobmaster.repository.UserRepository;
import com.example.jobmaster.security.jwt.JWTUntil;
import com.example.jobmaster.service.IUserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
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
    private PasswordEncoder passwordEncoder;
    private final static String URL_GET_TOKEN_GOOGLE = "https://www.googleapis.com/oauth2/v3/userinfo";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JWTUntil jwtUntil;
    @Override
    public ResponseEntity loginByGoogle(String token) {
        RestTemplate restTemplate = new RestTemplate();
        String url = URL_GET_TOKEN_GOOGLE;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<GoogleUserInfoDTO> entity = new HttpEntity<>(headers);

        GoogleUserInfoDTO response = restTemplate.exchange(url, HttpMethod.GET, entity, GoogleUserInfoDTO.class).getBody();

        if (userRepository.existsByUsername(response.getEmail())||userRepository.existsByGoogleId(response.getSub())){
            UserEntity user = userRepository.findByUsername(response.getEmail());
            return ResponseEntity.ok(this.loginByGoogle(user));
        }
        else {
            UserEntity userEntity = new UserEntity();
            userEntity.setGoogleId(response.getSub());
            userEntity.setUsername(response.getEmail());

            return ResponseEntity.ok(this.registerByGoogle(userEntity));
        }
    }

    @Override
    @Transactional
    public TokenDTO registerEnterprise(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getEmail())){
           throw new RuntimeException("cook");
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
                .userId(user.getId()) // Sử dụng ID của user sau khi đã lưu
                .build();

        enterpriseEntity = enterpriseRepository.save(enterpriseEntity);

        // Cập nhật enterpriseId trong user
        user.setEnterpriseId(enterpriseEntity.getId());
        user = userRepository.save(user);

        return TokenDTO.builder()
                .userId(user.getId())
                .token(jwtUntil.generateToken(user))
                .build();
    }

    private  TokenDTO loginByGoogle(UserEntity userEntity){
        String token = jwtUntil.generateToken(userEntity);
        return TokenDTO.builder()
                .userId(userEntity.getId())
                .token(token)
                .build();
    }

    private TokenDTO registerByGoogle(UserEntity userEntity){
        RoleEntity roleEntity = roleRepository.findById(1)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        Set<RoleEntity> roleEntities = new HashSet<>(Arrays.asList(roleEntity));
        userEntity.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
        userEntity.setRoles(roleEntities);
        UserEntity user = userRepository.save(userEntity);

        EnterpriseEntity enterpriseEntity = EnterpriseEntity
                .builder()
                .userId(user.getId())
                .build();
        enterpriseEntity= enterpriseRepository.save(enterpriseEntity);
        user.setEnterpriseId(enterpriseEntity.getId());
        user = userRepository.save(user);
        return TokenDTO.builder()
                .userId(user.getId())
                .token(jwtUntil.generateToken(user))
                .build();
    }
}
