package com.example.jobmaster.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CampaignDTO {
    private String id;
    private String name;
    private String field;
    private String position;
    private Integer quantity;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String enterpriseId;
}
