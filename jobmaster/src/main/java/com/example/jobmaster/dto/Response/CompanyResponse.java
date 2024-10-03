package com.example.jobmaster.dto.Response;

import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompanyResponse {

    private String id;
    private String companyName;
    private String address;
    private String fieldOfActivity;
    private String phoneNumber;
    private String emailCompany;
    private String linkWebSite;
    private String description;
    private String scales;
    private List<PostResponse> postResponses;
}
