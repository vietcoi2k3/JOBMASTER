package com.example.jobmaster.service;

import com.example.jobmaster.dto.Request.ChangePasswordRequest;
import com.example.jobmaster.dto.Request.LoginRequest;
import com.example.jobmaster.dto.Request.RegisterRequest;
import com.example.jobmaster.dto.TokenDTO;
import com.example.jobmaster.dto.UserDTO;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

/**
 * Class: UserService
 * Author: ACER
 * Date: 8/30/2024
 * Description: [Your description here]
 */

public interface IUserService {

    ResponseEntity loginByGoogle(String token,HttpServletRequest httpServletRequest);

    TokenDTO registerEnterprise(RegisterRequest registerRequest,HttpServletRequest httpServletRequest) throws MessagingException;

    public String confirmToken(String token) ;

    public String sendEmail(String email,HttpServletRequest httpServletRequest) throws MessagingException;

    public TokenDTO login(LoginRequest loginRequest, HttpServletRequest httpServletRequest);

    public UserDTO getUserByToken(String token);
    public UserDTO updateUser(String id, UserDTO userDTO);
    public void updatePassword(String token, ChangePasswordRequest changePasswordRequest);

}
