package com.example.jobmaster.service;

import com.example.jobmaster.dto.*;
import com.example.jobmaster.dto.Request.ActivatePackageRequest;
import com.example.jobmaster.dto.Response.*;
import com.example.jobmaster.entity.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IEnterpiseService {
    EnterpriseEntity getEnterpriseByHttpRequest(HttpServletRequest httpServletRequest);

    FileEntity sendCertificate(FileEntity fileEntity,HttpServletRequest httpServletRequest);
    String getStatus(HttpServletRequest httpServletRequest);

    CampaignDTO addCampaign(CampaignDTO campaignDTO, HttpServletRequest httpServletRequest);

    Page<CampaignResponse> getListCampaign(String search, int pageSize, int pageNumber, HttpServletRequest httpServletRequest);

    PostDTO addPost(String token,PostDTO postDTO);

    PostDTO updatePost(String id,PostDTO postDTO);

    void resetPostStatus(String id);

    EnterpriseDTO updateEnterprise(EnterpriseDTO enterpriseDTO,HttpServletRequest httpServletRequest);

    PageResponse getListPost(int pageNumber, int pageSize, HttpServletRequest httpServletRequest, String search,String status);

    PostDTO getDetailPost(String id);

    PageResponse getListCv(
      int pageNumber,
      int pageSize,
      String postId,
      String status
    );

    CVResponse getDetailCv(String id);

    CVEntity updateStatus(CVEntity cvEntity);

    List<PackageEntity> getListPackage(String id);

    String activatePackage(ActivatePackageRequest activatePackageRequest, HttpServletRequest httpServletRequest);

    HistoryResponse getHistoryMoney(int pageSize,int pageNumber,HttpServletRequest httpServletRequest);

    List<PackageEntity> getListPackageByCampaign(String id);

    List<PackageEntity> getAllPackage();

    void updateStatusCampaign(String id);
    void updateCampaign(String id,CampaignDTO campaignDTO);

    List<CampaignResponse> getAllCampaign(HttpServletRequest httpServletRequest, String campaignId);

    NewsInfoDTO getNewsInfo(String token);
    List<NewsChartDTO> getNewsChart(String token);
}
