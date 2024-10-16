package com.example.jobmaster.service;

import com.example.jobmaster.dto.CampaignDTO;
import com.example.jobmaster.dto.EnterpriseDTO;
import com.example.jobmaster.dto.PostDTO;
import com.example.jobmaster.dto.Response.CVResponse;
import com.example.jobmaster.dto.Response.PageResponse;
import com.example.jobmaster.dto.Response.PostResponse;
import com.example.jobmaster.entity.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IEnterpiseService {
    EnterpriseEntity getEnterpriseByHttpRequest(HttpServletRequest httpServletRequest);

    FileEntity sendCertificate(FileEntity fileEntity,HttpServletRequest httpServletRequest);
    String getStatus(HttpServletRequest httpServletRequest);

    CampaignDTO addCampaign(CampaignDTO campaignDTO, HttpServletRequest httpServletRequest);

    Page<CampaignEntity> getListCampaign(String search, int pageSize, int pageNumber, HttpServletRequest httpServletRequest);

    PostDTO addPost(PostDTO postDTO);

    EnterpriseDTO updateEnterprise(EnterpriseDTO enterpriseDTO,HttpServletRequest httpServletRequest);

    PageResponse getListPost(int pageNumber, int pageSize, HttpServletRequest httpServletRequest, String search);

    PostResponse getDetailPost(String id);

    PageResponse getListCv(
      int pageNumber,
      int pageSize,
      String postId
    );

    CVResponse getDetailCv(String id);

    CVEntity updateStatus(CVEntity cvEntity);

    List<PackageEntity> getListPackage(String id);

    String activatePackage(String packageId,String campaignId,HttpServletRequest httpServletRequest);
}
