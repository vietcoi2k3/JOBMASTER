package com.example.jobmaster.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewsChartDTO {
    private int month;
    private int year;
    private Integer totalCandidate;
    private Integer offeredCv;
}
