package com.example.jobmaster.service;

import com.example.jobmaster.dto.Response.CompanyResponse;
import com.example.jobmaster.dto.Response.PageResponse;
import com.example.jobmaster.dto.Response.PostResponse;
import com.example.jobmaster.entity.CriteriaEntity;
import com.example.jobmaster.entity.PostEntity;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface IConsumerService {
    public PageResponse<PostResponse> getListPost(int pageNumber,int pageSize,String search,String address,String field);

    public CompanyResponse getDetailCompany(String campaignId);

    CriteriaEntity addCriteriaEntity(CriteriaEntity criteriaEntity, HttpServletRequest httpServletRequest);

    List<PostResponse> getListPostByCriteria(HttpServletRequest httpServletRequest);

    CriteriaEntity getCriteria(HttpServletRequest httpServletRequest);

    List<PostResponse> getListByMoney();

    List<PostEntity> getPostByCompany(String id);
}
