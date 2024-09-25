package com.example.jobmaster.dto.Response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageResponse <T>{
    private List<T> data;
    private int totalPage;
}
