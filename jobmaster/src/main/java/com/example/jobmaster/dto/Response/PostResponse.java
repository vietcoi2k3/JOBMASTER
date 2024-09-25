package com.example.jobmaster.dto.Response;

import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class PostResponse {
    private String title;
    private String position;
    private String nameCam;
    private int quantityCv;
    private String salaryRange;
    private int deadLine;
    private LocalDateTime modifiedAt;
}
