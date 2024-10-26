package com.example.jobmaster.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewsInfoDTO {
    private Integer campaignOpening;
    private Integer postDisplaying;
    private Integer newCv;
    private Integer workCv;

}
