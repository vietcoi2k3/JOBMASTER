package com.example.jobmaster.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnterpriseResponse {
    private String username;
    private String companyName;
    private String status;
}
