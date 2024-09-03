package com.example.jobmaster.dto;

import lombok.*;

/**
 * Class: EnterpriseDTO
 * Author: ACER
 * Date: 9/2/2024
 * Description: [Your description here]
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EnterpriseDTO {
    private String fullName;
    private String companyName;
    private String city;
    private String district;
}
