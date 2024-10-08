package com.example.jobmaster.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenDTO {
    private String token;
    private String refreshToken;
    private String userId;
}
