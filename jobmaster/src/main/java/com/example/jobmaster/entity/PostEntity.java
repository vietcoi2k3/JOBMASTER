package com.example.jobmaster.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class PostEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    private String id;
    private String title;
    private LocalDate deadline;
    private int quantity;
    private String city;
    private String district;
    private String typeWorking;
    private String level;
    private String experience;
    private String timeWorking;
    @Column(columnDefinition = "longtext")
    private String description;
    @Column(columnDefinition = "longtext")
    private String required;
    @Column(columnDefinition = "longtext")
    private String interest;
    private String gender;
    @Column(columnDefinition = "longtext")
    private String requiredSkill;
    @Column(columnDefinition = "longtext")
    private String skillShouldHave;
    private String campaignId;
    private String status;
    private String salaryRange;
    private String position;
    private String field;
}
