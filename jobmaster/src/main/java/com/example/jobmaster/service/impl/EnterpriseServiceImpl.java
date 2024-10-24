package com.example.jobmaster.service.impl;

import com.example.jobmaster.dto.CampaignDTO;
import com.example.jobmaster.dto.EnterpriseDTO;
import com.example.jobmaster.dto.PostDTO;
import com.example.jobmaster.dto.Request.ActivatePackageRequest;
import com.example.jobmaster.dto.Response.*;
import com.example.jobmaster.entity.*;
import com.example.jobmaster.exception.NotFoundException;
import com.example.jobmaster.repository.*;
import com.example.jobmaster.security.jwt.JWTUntil;
import com.example.jobmaster.service.IEnterpiseService;
import com.example.jobmaster.until.constants.ExceptionMessage;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class EnterpriseServiceImpl implements IEnterpiseService {

    @Autowired
    private JWTUntil jwtUntil;

    @Autowired
    private HistoryPaymentRepository historyPaymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CVRepository cvRepository;

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

    @Autowired
    private PackageCampaignRepository packageCampaignRepository;

    @Autowired
    private PackageRepository packageRepository;
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
        EnterpriseEntity enterpriseEntity = enterpriseRepository.findByUserId(user.getId());
        enterpriseEntity.setBusinessCertificate(fileEntity.getUrl());
        enterpriseEntity.setIsActive(UserEnum.WAITING_ACTIVE.name());
        enterpriseRepository.save(enterpriseEntity);
        return null;
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
    public Page<CampaignResponse> getListCampaign(String search, int pageSize, int pageNumber, HttpServletRequest httpServletRequest) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        String username = jwtUntil.getUsernameFromRequest(httpServletRequest);
        UserEntity user = userRepository.findByUsername(username);
        return campaignRepository.getListCampaign(search,user.getEnterpriseId(),pageable);
    }

    @Override
    public PostDTO addPost(String token,PostDTO postDTO) {
        String username = jwtUntil.getUsernameFromToken(token.substring(7));
        EnterpriseEntity enterpriseEntity = enterpriseRepository.findEnterpriseEntityByUsername(username)
                .orElseThrow(()-> new NotFoundException(ExceptionMessage.ENTERPRISE_NOT_FOUND));
        if(!EnterpriseEnum.ACTIVE.name().equalsIgnoreCase(enterpriseEntity.getIsActive())){
            throw new IllegalArgumentException(ExceptionMessage.ENTERPRISE_NOT_ACTIVE);
        }
        CampaignEntity campaignEntity = campaignRepository.findById(postDTO.getCampaignId()).get();

        PostEntity postEntity = mapper.map(postDTO,PostEntity.class);
        postEntity.setStatus(PostEnum.AWAITING_APPROVAL.name());
        PostDTO postDTO1 =mapper.map(postRepository.save(postEntity),PostDTO.class);
        postDTO1.setCampaignName(campaignEntity.getName());
        campaignEntity.setPostId(postDTO1.getId());
        campaignRepository.save(campaignEntity);
        return postDTO1;
    }
    @Override
    public PostDTO updatePost(String id,PostDTO postDTO) {
        PostEntity postEntity = postRepository.findById(id)
                .orElseThrow(()-> new NotFoundException(ExceptionMessage.POST_NOT_FOUND));
        CampaignEntity oldCampaignEntity = campaignRepository.findById(postEntity.getCampaignId())
                .orElseThrow(()-> new NotFoundException(ExceptionMessage.CAMPAIGN_NOT_FOUND));
        oldCampaignEntity.setPostId(null);
        campaignRepository.save(oldCampaignEntity);
        CampaignEntity newCampaignEntity = campaignRepository.findById(postDTO.getCampaignId())
                .orElseThrow(()-> new NotFoundException(ExceptionMessage.CAMPAIGN_NOT_FOUND));
        newCampaignEntity.setPostId(postEntity.getId());
        campaignRepository.save(newCampaignEntity);
        mapper.map(postDTO,postEntity);
        postEntity.setStatus(PostEnum.AWAITING_APPROVAL.name());
        return mapper.map(postRepository.save(postEntity),PostDTO.class);
    }


    @Override
    public void resetPostStatus(String id) {
        PostEntity postEntity = postRepository.findById(id)
                .orElseThrow(()-> new NotFoundException(ExceptionMessage.POST_NOT_FOUND));
        postEntity.setStatus(PostEnum.NOT_APPROVED.name());
        postRepository.save(postEntity);
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
        enterpriseEntity.setLogo(enterpriseDTO.getLogo());

        enterpriseEntity = enterpriseRepository.save(enterpriseEntity);
        return mapper.map(enterpriseEntity,EnterpriseDTO.class);
    }

    @Override
    public PageResponse getListPost(int pageNumber, int pageSize, HttpServletRequest httpServletRequest, String search, String status) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        String username = jwtUntil.getUsernameFromRequest(httpServletRequest);
        UserEntity user = userRepository.findByUsername(username);
        List<String> campaignId = campaignRepository.getListIdCampaign(user.getEnterpriseId());

        Page<PostEntity> postEntities =  postRepository.getListCampaign(search,status,campaignId,pageable);

        List<PostResponse> postResponses = new ArrayList<>();
        for (PostEntity x : postEntities.getContent()){
            PostResponse postResponse = new PostResponse();
            if (x.getCampaignId()==null){
                continue;
            }
            CampaignEntity campaignEntity = campaignRepository.findById(x.getCampaignId()).get();
            postResponse.setPosition(x.getPosition());
            postResponse.setTitle(x.getTitle());
            postResponse.setNameCam(campaignEntity.getName());
            postResponse.setQuantityCv(cvRepository.countByPostId(x.getId()));
            postResponse.setId(x.getId());
            postResponse.setStatus(x.getStatus());
            postResponses.add(postResponse);

        }
        PageResponse pageResponse = new PageResponse();
        pageResponse.setData(postResponses);
        pageResponse.setTotalPage(postEntities.getTotalPages());
        return pageResponse;
    }

    @Override
    public PostDTO getDetailPost(String id) {
         PostEntity postEntity = postRepository.findById(id).get();
         CampaignEntity campaignEntity = campaignRepository.findById(postEntity.getCampaignId()).get();
        return PostDTO.builder()
                .id(postEntity.getId())
                .title(postEntity.getTitle())
                .field(postEntity.getField())
                .position(postEntity.getPosition())
                .deadline(postEntity.getDeadline())
                .quantity(postEntity.getQuantity())
                .city(postEntity.getCity())
                .district(postEntity.getDistrict())
                .typeWorking(postEntity.getTypeWorking())
                .level(postEntity.getLevel())
                .experience(postEntity.getExperience())
                .timeWorking(postEntity.getTimeWorking())
                .description(postEntity.getDescription())
                .required(postEntity.getRequired())
                .interest(postEntity.getInterest())
                .gender(postEntity.getGender())
                .requiredSkill(postEntity.getRequiredSkill())
                .skillShouldHave(postEntity.getSkillShouldHave())
                .campaignId(campaignEntity.getId())
                .campaignName(campaignEntity.getName())
                .salaryRange(postEntity.getSalaryRange())
                .additionalSkills(postEntity.getAdditionalSkills())
                .requiredSkills(postEntity.getRequiredSkills())
                .detailAddress(postEntity.getDetailAddress())
                .status(postEntity.getStatus())
                .build();
    }

    @Override
    public PageResponse getListCv(int pageNumber, int pageSize, String postId) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<CVEntity> cvEntityPage = cvRepository.getListCv(postId,pageable);

        return PageResponse.<CVEntity>builder()
                .totalPage(cvEntityPage.getTotalPages())
                .data(cvEntityPage.getContent())
                .build();
    }

    @Override
    public CVResponse getDetailCv(String id) {
        CVEntity cvEntity = cvRepository.findById(id).get();
        CVResponse cvResponse = mapper.map(cvEntity,CVResponse.class);
        FileEntity fileEntity = fileRepository.findById(cvResponse.getFileId()).get();
        cvResponse.setUrl(fileEntity.getUrl());
        return cvResponse;
    }

    @Override
    public CVEntity updateStatus(CVEntity cvEntity) {
        CVEntity cv = cvRepository.findById(cvEntity.getId()).get();
        cv.setNote(cvEntity.getNote());
        cv.setStatus(cvEntity.getStatus());

        return  cvRepository.save(cv);
    }
    @Override
    public List<PackageEntity> getListPackage(String campaignId) {
        List<String> packageId = packageCampaignRepository.getListIdPackage(campaignId);
        List<PackageEntity> packageEntities = packageRepository.findAll();
        for (String a: packageId
             ) {
            packageEntities.removeIf(x -> x.getId().equals(a));
        }
        return packageEntities;
    }

    @Override
    @Transactional
    public String activatePackage(ActivatePackageRequest activatePackageRequest, HttpServletRequest httpServletRequest) {
        UserEntity user = userRepository.findByUsername(jwtUntil.getUsernameFromRequest(httpServletRequest));
        if (user.getBalance().compareTo(activatePackageRequest.getPrice())<0){
            throw new IllegalArgumentException("MONEY NOT ENOUGH");
        }
        for (String x: activatePackageRequest.getPackageId()
             ) {

            PackageCampaign packageCampaign = new PackageCampaign();
            packageCampaign.setPackageId(x);
            packageCampaign.setCampaignId(activatePackageRequest.getCampaignId());

            packageCampaignRepository.save(packageCampaign);
        }
        user.setBalance(user.getBalance().subtract(activatePackageRequest.getPrice()));
        userRepository.save(user);

        HistoryMoney historyMoney = new HistoryMoney();
        historyMoney.setBalanceAfter(user.getBalance());
        historyMoney.setAddMoney(false);
        historyMoney.setAmount(activatePackageRequest.getPrice());
        historyMoney.setUserId(user.getId());
        historyPaymentRepository.save(historyMoney);
        return "SUCCESS";
    }

    @Override
    public HistoryResponse getHistoryMoney(HttpServletRequest httpServletRequest) {
        UserEntity user = userRepository.findByUsername(jwtUntil.getUsernameFromRequest(httpServletRequest));
        List<HistoryMoney> historyMoneyList = historyPaymentRepository.findAllByUserIdOrderByCreatedAtDesc(user.getId());
        return HistoryResponse.builder()
                .historyMoneyList(historyMoneyList)
                .totalMoney(user.getBalance())
                .build();
    }

    @Override
    public List<PackageEntity> getListPackageByCampaign(String id) {
        List<PackageEntity> packageEntities = packageRepository.getPackageByCampaign(id);
        return packageEntities;
    }

    @Override
    public void updateStatusCampaign(String id) {
        CampaignEntity campaignEntity = campaignRepository.findById(id)
                .orElseThrow(()->new NotFoundException(ExceptionMessage.CAMPAIGN_NOT_FOUND));
        campaignEntity.setActive(!campaignEntity.isActive());
        campaignRepository.save(campaignEntity);
        if(!campaignEntity.isActive() && campaignEntity.getPostId()!=null){
            PostEntity postEntity = postRepository.findById(campaignEntity.getPostId())
                    .orElseThrow(()-> new NotFoundException(ExceptionMessage.POST_NOT_FOUND));
            postEntity.setStatus(PostEnum.NOT_APPROVED.name());
            postRepository.save(postEntity);
        }
    }

    @Override
    public void updateCampaign(String id, CampaignDTO campaignDTO) {
        CampaignEntity campaignEntity = campaignRepository.findById(id)
                .orElseThrow(()->new NotFoundException(ExceptionMessage.CAMPAIGN_NOT_FOUND));
        campaignEntity.setName(campaignDTO.getName());
        campaignRepository.save(campaignEntity);
    }

    @Override
    public List<CampaignResponse> getAllCampaign(HttpServletRequest httpServletRequest) {
        String username = jwtUntil.getUsernameFromRequest(httpServletRequest);
        UserEntity user = userRepository.findByUsername(username);
        System.out.println(user.getEnterpriseId());
        return campaignRepository.getListCampaignForPost(user.getEnterpriseId());
    }
}