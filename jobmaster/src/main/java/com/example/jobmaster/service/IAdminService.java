package com.example.jobmaster.service;

import com.example.jobmaster.dto.Response.EnterpriseResponse;
import com.example.jobmaster.dto.Response.PackageResponse;
import com.example.jobmaster.dto.Response.PageResponse;
import com.example.jobmaster.dto.Response.UserInfoResponse;
import com.example.jobmaster.entity.*;
import com.example.jobmaster.enumration.Time;

import java.util.List;

public interface IAdminService {
    List<FieldEntity> getListField(String code,String name);
    PageResponse<UserInfoResponse> getListCandidate(int pageSize, int pageNumber);
    PageResponse<EnterpriseResponse> getListAdmin(int pageSize, int pageNumber);
    PageResponse<EnterpriseEntity> getListCertificate(int pageSize, int pageNumber);
    PageResponse<CampaignEntity> getListCampaign(int pageSize, int pageNumber, String search);

   List<PackageResponse> getListPackageAdmin( Time time);


}
