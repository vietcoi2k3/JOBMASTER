package com.example.jobmaster.service.impl;

import com.example.jobmaster.dto.Response.EnterpriseResponse;
import com.example.jobmaster.dto.Response.PageResponse;
import com.example.jobmaster.dto.Response.UserInfoResponse;
import com.example.jobmaster.entity.CampaignEntity;
import com.example.jobmaster.entity.EnterpriseEntity;
import com.example.jobmaster.entity.FieldEntity;
import com.example.jobmaster.repository.CampaignRepository;
import com.example.jobmaster.repository.EnterpriseRepository;
import com.example.jobmaster.repository.UserInfoRepository;
import com.example.jobmaster.repository.UserRepository;
import com.example.jobmaster.service.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements IAdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    @Override
    public List<FieldEntity> getListField(String code, String name) {
        return null;
    }

    @Override
    public PageResponse<UserInfoResponse> getListCandidate(int pageSize, int pageNumber) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<UserInfoResponse> page =userInfoRepository.getListCandidate(pageable);
        return PageResponse.<UserInfoResponse>builder()
                .data(page.getContent())
                .build();
    }

    @Override
    public PageResponse<EnterpriseResponse> getListAdmin(int pageSize, int pageNumber) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<EnterpriseResponse> page = enterpriseRepository.getListAdmin(pageable);
        return PageResponse.<EnterpriseResponse>builder()
                .data(page.getContent())
                .build();
    }

    @Override
    public PageResponse<EnterpriseEntity> getListCertificate(int pageSize, int pageNumber) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<EnterpriseEntity> page = enterpriseRepository.getListCertificate(pageable);
        return PageResponse.<EnterpriseEntity>builder()
                .data(page.getContent())
                .build();
    }

    @Override
    public PageResponse<CampaignEntity> getListCampaign(int pageSize, int pageNumber, String search) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<CampaignEntity> page = campaignRepository.getListCampaignAdmin(search,pageable);
        return PageResponse.<CampaignEntity>builder()
                .data(page.getContent())
                .build();
    }
}
