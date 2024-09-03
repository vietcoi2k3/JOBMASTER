package com.example.jobmaster.service;

import com.example.jobmaster.dto.Request.RegisterRequest;
import com.example.jobmaster.dto.TokenDTO;
import org.springframework.http.ResponseEntity;

/**
 * Class: UserService
 * Author: ACER
 * Date: 8/30/2024
 * Description: [Your description here]
 */

public interface IUserService {

    ResponseEntity loginByGoogle(String token);

    TokenDTO registerEnterprise(RegisterRequest registerRequest);

}
