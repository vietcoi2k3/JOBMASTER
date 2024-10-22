package com.example.jobmaster.dto.Response;

import java.time.LocalDateTime;

public interface CampaignResponse {
    String getId();
    String getName();
    Integer getQuantity();
    LocalDateTime getStartDate();
    LocalDateTime getEndDate();
    boolean getIsActive();
    String getPosition();
    String getPostId();
    String getPostStatus();
    Integer getCvQuantity();
    String getTitlePost();
}
