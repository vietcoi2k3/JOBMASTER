package com.example.jobmaster.controller;

import com.example.jobmaster.dto.Request.LoginRequest;
import com.example.jobmaster.dto.Request.RegisterRequest;
import com.example.jobmaster.entity.FileEntity;
import com.example.jobmaster.entity.UserEntity;
import com.example.jobmaster.service.IFileService;
import com.example.jobmaster.service.IUserService;
import com.example.jobmaster.service.impl.UserServiceImpl;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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
    private IUserService userService;

    @Autowired
    private IFileService iFileService;


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
    public ResponseEntity<FileEntity> uploadFile(@RequestParam("file") MultipartFile file,HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(iFileService.uploadFile(file,httpServletRequest));
    };

    @GetMapping(value = "/get-file")
    public ResponseEntity getFile(@RequestParam String fileId) throws IOException {
        return iFileService.getFile(fileId);
    };
}
