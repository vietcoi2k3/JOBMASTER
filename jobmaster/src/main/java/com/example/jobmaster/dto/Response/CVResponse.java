package com.example.jobmaster.dto.Response;

import com.example.jobmaster.entity.StatusCVEnum;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CVResponse {
    private String id;
    private String fileId;
    private String postId;
    private String description;
    private String email;
    private String phoneNumber;
    private String name;
    @Enumerated(EnumType.STRING)
    private StatusCVEnum status;
    private String url;

}
