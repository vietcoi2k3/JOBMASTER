package com.example.jobmaster.dto;

import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostDTO {
    private String id;
    private String title;
    private String field;
    private String position;
    private LocalDate deadline;
    private int quantity;
    private String city;
    private String district;
    private String detailAddress;
    private String typeWorking;
    private String level;
    private String experience;
    private String timeWorking;
    private String description;
    private String required;
    private String interest;
    private String gender;
    private String requiredSkill;
    private String skillShouldHave;
    private String campaignId;
    private String salaryRange;
    private String campaignName;
    private String status;
}
