package com.example.jobmaster.service.impl;

import com.example.jobmaster.dto.CampaignDTO;
import com.example.jobmaster.dto.EnterpriseDTO;
import com.example.jobmaster.dto.PostDTO;
import com.example.jobmaster.entity.*;
import com.example.jobmaster.repository.*;
import com.example.jobmaster.security.jwt.JWTUntil;
import com.example.jobmaster.service.IEnterpiseService;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EnterpriseServiceImpl implements IEnterpiseService {

    @Autowired
    private JWTUntil jwtUntil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ModelMapper mapper;
    @Override
    public EnterpriseEntity getEnterpriseByHttpRequest(HttpServletRequest httpServletRequest) {
        String username = jwtUntil.getUsernameFromRequest(httpServletRequest);
        UserEntity user = userRepository.findByUsername(username);

        return enterpriseRepository.findByUserId(user.getId());
    }

    @Override
    public FileEntity sendCertificate(FileEntity fileEntity,HttpServletRequest httpServletRequest) {
        String username = jwtUntil.getUsernameFromRequest(httpServletRequest);
        UserEntity user = userRepository.findByUsername(username);
        fileRepository.setFileActiveIsFalse(user.getEnterpriseId());

        FileEntity file = fileRepository.findById(fileEntity.getId()).get();
        file.setType(TypeFileEnum.CERTIFICATE_BUSINESS.name());
        file.setActive(true);
        file.setEnterpriseId(user.getEnterpriseId());



        EnterpriseEntity enterpriseEntity = enterpriseRepository.findByUserId(user.getId());
        enterpriseEntity.setIsActive(UserEnum.WAITING_ACTIVE.name());
        enterpriseRepository.save(enterpriseEntity);
        return fileRepository.save(file);
    }

    @Override
    public String getStatus(HttpServletRequest httpServletRequest) {
        String username = jwtUntil.getUsernameFromRequest(httpServletRequest);
        UserEntity user = userRepository.findByUsername(username);

        EnterpriseEntity enterpriseEntity = enterpriseRepository.findByUserId(user.getId());

        return enterpriseEntity.getIsActive();
    }


    @Override
    public CampaignDTO addCampaign(CampaignDTO campaignDTO, HttpServletRequest httpServletRequest) {
        String username =jwtUntil.getUsernameFromRequest(httpServletRequest);
        UserEntity user = userRepository.findByUsername(username);
        campaignDTO.setEnterpriseId(user.getEnterpriseId());
        CampaignEntity campaignEntity =mapper.map(campaignDTO,CampaignEntity.class);
        return mapper.map(campaignRepository.save(campaignEntity),CampaignDTO.class) ;
    }

    @Override
    public Page<CampaignEntity> getListCampaign(String search, int pageSize, int pageNumber,HttpServletRequest httpServletRequest) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        String username = jwtUntil.getUsernameFromRequest(httpServletRequest);
        UserEntity user = userRepository.findByUsername(username);
        return campaignRepository.getListCampaign(search,user.getEnterpriseId(),pageable);
    }

    @Override
    public PostDTO addPost(PostDTO postDTO) {
        PostEntity postEntity = mapper.map(postDTO,PostEntity.class);
        return mapper.map(postRepository.save(postEntity),PostDTO.class);
    }


    @Override
    public EnterpriseDTO updateEnterprise(EnterpriseDTO enterpriseDTO,HttpServletRequest httpServletRequest) {
        EnterpriseEntity enterpriseEntity = getEnterpriseByHttpRequest(httpServletRequest);

        enterpriseEntity.setAddress(enterpriseDTO.getAddress());
        enterpriseEntity.setDescription(enterpriseDTO.getDescription());
        enterpriseEntity.setCompanyName(enterpriseDTO.getCompanyName());
        enterpriseEntity.setEmailCompany(enterpriseDTO.getEmailCompany());
        enterpriseEntity.setFieldOfActivity(enterpriseDTO.getFieldOfActivity());
        enterpriseEntity.setLinkWebSite(enterpriseDTO.getLinkWebSite());
        enterpriseEntity.setPhoneNumber(enterpriseDTO.getPhoneNumber());
        enterpriseEntity.setScale(enterpriseDTO.getScale());
        enterpriseEntity.setTax(enterpriseDTO.getTax());

        enterpriseEntity = enterpriseRepository.save(enterpriseEntity);
        return mapper.map(enterpriseEntity,EnterpriseDTO.class);
    }
}