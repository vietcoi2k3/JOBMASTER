package com.example.jobmaster.controller;

import com.example.jobmaster.dto.Request.LoginRequest;
import com.example.jobmaster.dto.Request.RegisterRequest;
import com.example.jobmaster.entity.FileEntity;
import com.example.jobmaster.entity.UserEntity;
import com.example.jobmaster.repository.FieldRepository;
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
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


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
    public ResponseEntity<FileEntity> uploadFile(@RequestParam("file") MultipartFile file,HttpServletRequest httpServletRequest) throws IOException {
        return ResponseEntity.ok(iFileUploadService.uploadFile(file.getBytes()));
    };

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
}
