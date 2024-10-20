package com.example.jobmaster.dto.Request;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ActivatePackageRequest {
    private List<String> packageId;
    private String campaignId;
    private BigDecimal price;
}
