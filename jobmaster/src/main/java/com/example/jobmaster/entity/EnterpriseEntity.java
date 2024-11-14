package com.example.jobmaster.entity;

import com.sun.istack.NotNull;
import jakarta.persistence.*;
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
    private String logo = "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/logo_default.png";
    private String scale;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private String isActive = "INACTIVE";
    @NotNull
    private String userId;

    public EnterpriseEntity() {

    }

    @PrePersist
    protected void onCreate() {
        this.logo = "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/logo_default.png";        // Default logo value
        this.isActive = "INACTIVE"; // Default active status
    }
}
