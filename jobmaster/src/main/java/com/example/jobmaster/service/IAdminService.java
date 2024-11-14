package com.example.jobmaster.service;

import com.example.jobmaster.dto.Response.*;
import com.example.jobmaster.entity.*;
import com.example.jobmaster.enumration.Time;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface IAdminService {
    List<FieldEntity> getListField(String code,String name);
    PageResponse<UserInfoResponse> getListCandidate(int pageSize, int pageNumber);
    PageResponse<EnterpriseResponse> getListAdmin(int pageSize, int pageNumber);
    PageResponse<EnterpriseManagement> getListCertificate(int pageSize, int pageNumber, String status, String username);
    PageResponse<CampaignManagement> getListCampaign(int pageSize, int pageNumber, String campaignName, String tax);

   List<PackageResponse> getListPackageAdmin( Time time);
   PageResponse<PostManagement> getListPost(int pageSize, int pageNumber, String postName, String tax);

   PostEntity getDetailPost(String id);

    PostEntity updateStatusPost(String id,PostEnum status);

    EnterpriseEntity updateStatusEnterprise(String status, String id);

    List<EnterpriseEntity> getListEnterprise(int pageNumber, int pageSize);

    PageResponse<EnterpriseResponse> getListCompany(int pageSize, int pageNumber);

    CampaignEntity updateStatusCampaign(String campaignId, boolean status);

    PageResponse<FieldEntity> getListField(int pageSize, int pageNumber,String code,String name);

    PageResponse<PositionEntity> getListPosition(int pageSize, int pageNumber,String code,String name);

    String updateStatusCandidate(String username,String status);


    String updateStatusAccountEnterprise(String username,String status);
}
