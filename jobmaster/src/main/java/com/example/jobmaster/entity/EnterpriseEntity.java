package com.example.jobmaster.entity;

import com.sun.istack.NotNull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.web.bind.annotation.RestController;

/**
 * Class: EnterpriseEntity
 * Author: ACER
 * Date: 9/2/2024
 * Description: [Your description here]
 */

@Entity
@RestController
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EnterpriseEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
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
