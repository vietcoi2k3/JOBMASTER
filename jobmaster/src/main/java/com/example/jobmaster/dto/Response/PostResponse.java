package com.example.jobmaster.dto.Response;

import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class PostResponse {
    private String id;
    private String title;
    private String position;
    private String nameCam;
    private int quantityCv;
    private String salaryRange;
    private String typeWorking;
    private int deadLine;
    private LocalDateTime modifiedAt;
    private String enterpriseId;
    private String logoCompany;
    private String description;
    private String interest;
    private String required;
    private String nameCompany;
    private String scales;
    private int quantity;
    private String city;
    private String packageId;
    private boolean isLabel;
    private String level;
    private String experience;
    private String gender;
    private String timeWorking;
    private String campaignId;
    private String status;
}
