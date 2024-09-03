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
public class EnterpriseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String companyName;
    private String city;
    private String district;
    private String businessCertificate;

    @NotNull
    private String userId;
}
