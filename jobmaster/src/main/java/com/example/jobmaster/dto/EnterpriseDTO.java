package com.example.jobmaster.dto;

import com.sun.istack.NotNull;
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
    private String id;
    private String companyName;
    private String city;
    private String address;
    private String district;
    private String tax;
    private String fieldOfActivity;
    private String phoneNumber;
    private String emailCompany;
    private String linkWebSite;
    private String businessCertificate;
    private String logo;
    private String scale;
    private String description;
    private String isActive;
    @NotNull
    private String userId;
}
