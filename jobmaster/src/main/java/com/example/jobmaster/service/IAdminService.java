package com.example.jobmaster.service;

import com.example.jobmaster.dto.Response.EnterpriseResponse;
import com.example.jobmaster.dto.Response.UserInfoResponse;
import com.example.jobmaster.entity.*;

import java.util.List;

public interface IAdminService {
    List<FieldEntity> getListField(String code,String name);
    List<UserInfoResponse> getListCandidate(int pageSize, int pageNumber);

    List<EnterpriseResponse> getListAdmin(int pageSize, int pageNumber);

}
