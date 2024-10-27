package com.example.jobmaster.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class UserDTO {

    private String id;
    private String username;
    private String password;
    private String fullName;
    private String gender;
    private String enterpriseId;
    private String historyId;
    private BigDecimal balance;
    private String phoneNumber;
}
