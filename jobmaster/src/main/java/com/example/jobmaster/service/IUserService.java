package com.example.jobmaster.service;

import com.example.jobmaster.dto.Request.LoginRequest;
import com.example.jobmaster.dto.Request.RegisterRequest;
import com.example.jobmaster.dto.TokenDTO;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;

/**
 * Class: UserService
 * Author: ACER
 * Date: 8/30/2024
 * Description: [Your description here]
 */

public interface IUserService {

    ResponseEntity loginByGoogle(String token);

    TokenDTO registerEnterprise(RegisterRequest registerRequest) throws MessagingException;

    public String confirmToken(String token) ;

    public String sendEmail(String email) throws MessagingException;

    public TokenDTO login(LoginRequest loginRequest);


}
