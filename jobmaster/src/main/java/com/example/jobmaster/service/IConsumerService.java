package com.example.jobmaster.service;

import com.example.jobmaster.dto.PostDTO;
import com.example.jobmaster.dto.Response.CompanyResponse;
import com.example.jobmaster.dto.Response.PageResponse;
import com.example.jobmaster.dto.Response.PostResponse;

import java.util.List;

public interface IConsumerService {
    public PageResponse<PostResponse> getListPost(int pageNumber,int pageSize,String search,String address,String field);

    public CompanyResponse getDetailCompany(String campaignId);
}
