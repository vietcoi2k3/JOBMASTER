package com.example.jobmaster.dto.Request;

import lombok.*;

/**
 * Class: RegisterRequest
 * Author: ACER
 * Date: 9/3/2024
 * Description: [Your description here]
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class RegisterRequest {
    private String email;
    private String password;
    private String fullName;
    private String gender;
    private String companyName;
    private String city;
    private String district;
}
