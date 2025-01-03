package com.example.jobmaster.service;

import com.example.jobmaster.dto.Request.ChangePasswordRequest;
import com.example.jobmaster.dto.Request.LoginRequest;
import com.example.jobmaster.dto.Request.RegisterRequest;
import com.example.jobmaster.dto.TokenDTO;
import com.example.jobmaster.dto.UserDTO;
import com.example.jobmaster.entity.RoleEntity;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

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

    UserDTO getUserByToken(String token);
    UserDTO updateUser(String id, UserDTO userDTO);
    void updatePassword(String token, ChangePasswordRequest changePasswordRequest);

    List<RoleEntity> getRole(String token);

    public void sendResetPasswordEmail(String email, HttpServletRequest request) throws MessagingException;

    public void validatePasswordResetToken(String token) throws MessagingException;

    public void resetPassword(String token, String newPassword);

}
