package com.example.jobmaster.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter
public class GoogleUserInfoDTO {
    private String sub;
    private String name;
    private String given_name;
    private String family_name;
    private String picture;
    private String email;
    private Boolean email_verified;
}
