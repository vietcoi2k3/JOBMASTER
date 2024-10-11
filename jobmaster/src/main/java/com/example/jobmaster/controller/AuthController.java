package com.example.jobmaster.controller;

import com.example.jobmaster.dto.Request.LoginRequest;
import com.example.jobmaster.dto.Request.RegisterRequest;
import com.example.jobmaster.entity.FileEntity;
import com.example.jobmaster.entity.UserEntity;
import com.example.jobmaster.repository.FieldRepository;
import com.example.jobmaster.repository.FileRepository;
import com.example.jobmaster.repository.PositionRepository;
import com.example.jobmaster.repository.PostRepository;
import com.example.jobmaster.service.IFileService;
import com.example.jobmaster.service.IFileUploadService;
import com.example.jobmaster.service.IUserService;

import com.example.jobmaster.service.impl.ConsumerImpl;
import com.example.jobmaster.until.constants.DefautlConstants;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;


/**
 * Class: AuthController
 * Author: ACER
 * Date: 8/30/2024
 * Description: [Your description here]
 */

@RestController
@RequestMapping(value = "/auth")
public class  AuthController {

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private IUserService userService;

    @Autowired
    private IFileService iFileService;


    @Autowired
    private IFileUploadService iFileUploadService;

    @Autowired
    private ConsumerImpl consumer;

    @Autowired
    private PostRepository postRepository;


    @PostMapping(value = "/login-by-goolge")
    public ResponseEntity loginByGoogle(@RequestParam String token){
        return userService.loginByGoogle(token);
    }

    @PostMapping(value = "/register-enterprise")
    public ResponseEntity registerEnterprise(@RequestBody RegisterRequest registerRequest) throws MessagingException {
        return  ResponseEntity.ok(userService.registerEnterprise(registerRequest));
    }

    @PostMapping(value = "/login")
    public ResponseEntity login(@RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(userService.login(loginRequest));
    }

    @GetMapping("/confirm")
    public ResponseEntity confirmEmail(@RequestParam("token") String token) {
        return ResponseEntity.ok(userService.confirmToken(token));
    }

    @GetMapping("/send-email")
    public ResponseEntity sendEmail(@RequestParam String email) throws MessagingException {
        return  ResponseEntity.ok(userService.sendEmail(email));
    }

    @PostMapping("/upload")
    public ResponseEntity<FileEntity> uploadFile(@RequestParam("file") MultipartFile file, HttpServletRequest httpServletRequest) throws IOException {
        // Lấy content type của file để xác định loại tệp
        String contentType = file.getContentType();
        String fileType = "auto";  // Mặc định là "auto"

        // Kiểm tra loại tệp
        if (contentType != null && contentType.equalsIgnoreCase("application/pdf")) {
            fileType = "pdf"; // Đặt fileType là pdf khi file là PDF
        }

        // Gọi đến service và truyền thêm fileType để xử lý
        return ResponseEntity.ok(iFileUploadService.uploadFile(file.getBytes(), fileType));
    }

    private static final String UPLOAD_DIR = "uploads" + File.separator;

    @Autowired
    private FileRepository fileRepository;

    @PostMapping("/upload-pdf")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Tạo thư mục nếu chưa tồn tại
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs(); // Tạo thư mục
            }

            // Tạo tên tệp duy nhất và đường dẫn lưu trữ
            String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            String filePath = UPLOAD_DIR + uniqueFileName;
            File destFile = new File(filePath);

            // Lưu tệp vào đường dẫn
            file.transferTo(destFile);

            // Tạo đối tượng FileEntity để lưu thông tin tệp vào cơ sở dữ liệu
            FileEntity fileEntity = new FileEntity();
            fileEntity.setUrl(filePath); // Đường dẫn của tệp lưu trên server

            // Lưu thông tin tệp vào cơ sở dữ liệu và trả về thông tin đã lưu
            return ResponseEntity.ok(fileRepository.save(fileEntity));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping(value = "/get-file")
    public ResponseEntity getFile(@RequestParam String fileId) throws IOException {
        return iFileService.getFile(fileId);
    };

    @GetMapping(value = "/get-all-field")
    public ResponseEntity getAllField(){
        return ResponseEntity.ok(fieldRepository.findAll());
    }

    @GetMapping(value = "/get-all-position")
    public ResponseEntity getAllPosition(){
        return ResponseEntity.ok(positionRepository.findAll());
    }

    @RequestMapping(value = "/get-list-post",method = RequestMethod.GET)
    public ResponseEntity getListPost(
            @RequestParam(defaultValue = DefautlConstants.PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = DefautlConstants.PAGE_NO) int pageNumber,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "") String address,
            @RequestParam(defaultValue = "") String field,
            @RequestParam(defaultValue = "") String packageName
    ){
        return ResponseEntity.ok(consumer.getListPost(pageNumber,pageSize,search,address,field));
    }

    @RequestMapping(value = "/get-detail-job")
    public ResponseEntity getDetailJob(@RequestParam String postId){
        return ResponseEntity.ok(postRepository.findById(postId).get());
    }

    @RequestMapping(value = "/get-detail-company",method = RequestMethod.GET)
    public ResponseEntity getDetailCompany(@RequestParam String campaignId){
        return ResponseEntity.ok(consumer.getDetailCompany(campaignId));
    }

    @GetMapping("/download")
    @ResponseBody
    public ResponseEntity<Resource> downloadFile(@RequestParam String url) {
        try {
            Path filePath = Paths.get("").resolve(url).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }


}
