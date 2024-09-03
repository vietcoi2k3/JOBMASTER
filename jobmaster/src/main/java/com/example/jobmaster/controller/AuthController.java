package com.example.jobmaster.controller;

import com.example.jobmaster.dto.Request.RegisterRequest;
import com.example.jobmaster.service.IUserService;
import com.example.jobmaster.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Class: AuthController
 * Author: ACER
 * Date: 8/30/2024
 * Description: [Your description here]
 */

@RestController
@RequestMapping(value = "/auth")
public class AuthController {

    @Autowired
    private IUserService userService;

    @PostMapping(value = "/login-by-goolge")
    public ResponseEntity loginByGoogle(@RequestParam String token){
        return userService.loginByGoogle(token);
    }

    @PostMapping(value = "/register-enterprise")
    public ResponseEntity registerEnterprise(@RequestBody RegisterRequest registerRequest){
        return  ResponseEntity.ok(userService.registerEnterprise(registerRequest));
    }
}
