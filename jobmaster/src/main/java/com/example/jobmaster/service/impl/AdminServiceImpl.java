package com.example.jobmaster.service.impl;

import com.example.jobmaster.dto.Response.EnterpriseResponse;
import com.example.jobmaster.dto.Response.UserInfoResponse;
import com.example.jobmaster.entity.FieldEntity;
import com.example.jobmaster.repository.EnterpriseRepository;
import com.example.jobmaster.repository.UserInfoRepository;
import com.example.jobmaster.repository.UserRepository;
import com.example.jobmaster.service.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
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


    @Override
    public List<FieldEntity> getListField(String code, String name) {
        return null;
    }

    @Override
    public List<UserInfoResponse> getListCandidate(int pageSize, int pageNumber) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        return userInfoRepository.getListCandidate(pageable);
    }

    @Override
    public List<EnterpriseResponse> getListAdmin(int pageSize, int pageNumber) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        return enterpriseRepository.getListAdmin(pageable);
    }
}
