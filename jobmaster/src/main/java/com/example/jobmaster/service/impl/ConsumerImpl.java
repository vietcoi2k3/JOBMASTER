package com.example.jobmaster.service.impl;

import com.example.jobmaster.dto.Response.CompanyResponse;
import com.example.jobmaster.dto.Response.PageResponse;
import com.example.jobmaster.dto.Response.PostResponse;
import com.example.jobmaster.entity.CampaignEntity;
import com.example.jobmaster.entity.EnterpriseEntity;
import com.example.jobmaster.entity.PackageCampaign;
import com.example.jobmaster.entity.PostEntity;
import com.example.jobmaster.repository.CampaignRepository;
import com.example.jobmaster.repository.EnterpriseRepository;
import com.example.jobmaster.repository.PackageCampaignRepository;
import com.example.jobmaster.repository.PostRepository;
import com.example.jobmaster.service.IConsumerService;
import org.apache.catalina.mapper.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class ConsumerImpl implements IConsumerService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private PackageCampaignRepository packageCampaignRepository;

    @Autowired
    private ModelMapper mapper;
    @Override
    public PageResponse<PostResponse> getListPost(int pageNumber,int pageSize ,String search, String address, String field) {
        pageNumber--;
        Pageable p = PageRequest.of(pageNumber,pageSize);
        Page<PostEntity> postEntities = postRepository.getListPost(search,address,field,p);
        List<PostResponse> listResult = new ArrayList<>();
        System.out.println(listResult.size());
        for (PostEntity x: postEntities.getContent()
             ) {
            CampaignEntity campaignEntity = campaignRepository.findById(x.getCampaignId()).get();
            EnterpriseEntity enterprise = enterpriseRepository.findById(campaignEntity.getEnterpriseId()).get();
            PostResponse postResponse = new PostResponse();
            postResponse.setId(x.getId());
            postResponse.setQuantityCv(x.getQuantity());
            postResponse.setTitle(x.getTitle());
            postResponse.setNameCam(x.getTitle());
            postResponse.setDeadLine((int) ChronoUnit.DAYS.between(x.getDeadline(), LocalDateTime.now()));
            postResponse.setSalaryRange(x.getSalaryRange());
            postResponse.setDescription(x.getDescription());
            postResponse.setInterest(x.getInterest());
            postResponse.setRequired(x.getRequired());
            postResponse.setLogoCompany(enterprise.getLogo());
            postResponse.setEnterpriseId(enterprise.getId());
            postResponse.setNameCompany(enterprise.getCompanyName());
            postResponse.setScales(enterprise.getScale());
            postResponse.setLabel(packageCampaignRepository.existsByCampaignIdAndPackageId(campaignEntity.getId(),"TA01 "));
            listResult.add(postResponse);
        }

        PageResponse<PostResponse> pageResponse = new PageResponse<>();
        pageResponse.setTotalPage(postEntities.getTotalPages());
        pageResponse.setData(listResult);
        return pageResponse;
    }

    @Override
    public CompanyResponse getDetailCompany(String enterpriseId) {

        EnterpriseEntity enterprise = enterpriseRepository.findById(enterpriseId).get();
        CompanyResponse companyResponse = mapper.map(enterprise,CompanyResponse.class);

        return companyResponse;
    }
}
