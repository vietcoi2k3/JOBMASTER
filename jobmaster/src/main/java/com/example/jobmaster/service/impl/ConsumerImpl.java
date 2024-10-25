package com.example.jobmaster.service.impl;

import com.example.jobmaster.dto.Response.CompanyResponse;
import com.example.jobmaster.dto.Response.PageResponse;
import com.example.jobmaster.dto.Response.PostResponse;
import com.example.jobmaster.entity.*;
import com.example.jobmaster.repository.*;
import com.example.jobmaster.security.jwt.JWTUntil;
import com.example.jobmaster.service.IConsumerService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.servlet.http.HttpServletRequest;
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUntil jwtUntil;

    @Autowired
    private CriteriaRepository criteriaRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private EntityManager entityManager;
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
            postResponse.setDeadLine((int) ChronoUnit.DAYS.between(x.getDeadline(), LocalDateTime.now())*-1);
            postResponse.setSalaryRange(x.getSalaryRange());
            postResponse.setDescription(x.getDescription());
            postResponse.setInterest(x.getInterest());
            postResponse.setRequired(x.getRequired());
            postResponse.setLogoCompany(enterprise.getLogo());
            postResponse.setEnterpriseId(enterprise.getId());
            postResponse.setNameCompany(enterprise.getCompanyName());
            postResponse.setScales(enterprise.getScale());
            postResponse.setLabel(packageCampaignRepository.existsByCampaignIdAndPackageId(campaignEntity.getId(),"TA01"));
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

    @Override
    public CriteriaEntity addCriteriaEntity(CriteriaEntity criteriaEntity, HttpServletRequest httpServletRequest) {

        UserEntity user = userRepository.findByUsername(jwtUntil.getUsernameFromRequest(httpServletRequest));
        UserInfoEntity userInfoEntity = userInfoRepository.findById(user.getUserInfoId()).get();
        if (userInfoEntity.getCriteriaId()==null){
            criteriaEntity.setUserInfoId(userInfoEntity.getId());
            criteriaEntity = criteriaRepository.save(criteriaEntity);

            userInfoEntity.setCriteriaId(criteriaEntity.getId());
            userInfoRepository.save(userInfoEntity);
            return criteriaEntity;
        }
        CriteriaEntity criteriaUpdate = criteriaRepository.findById(userInfoEntity.getCriteriaId()).get();
        criteriaUpdate.setScales(criteriaEntity.getScales());
        criteriaUpdate.setCity(criteriaEntity.getCity());
        criteriaUpdate.setExperience(criteriaEntity.getExperience());
        criteriaUpdate.setField(criteriaEntity.getField());
        criteriaUpdate.setPosition(criteriaEntity.getPosition());
        criteriaUpdate.setTypeWorking(criteriaEntity.getTypeWorking());
        return criteriaRepository.save(criteriaUpdate);
    }

    @Override
    public List<PostResponse> getListPostByCriteria(HttpServletRequest httpServletRequest
     ) {
        UserEntity user = userRepository.findByUsername(jwtUntil.getUsernameFromRequest(httpServletRequest));
        UserInfoEntity userInfoEntity = userInfoRepository.findById(user.getUserInfoId()).get();
        if (userInfoEntity.getCriteriaId()==null){
            return new ArrayList<>();
        }
        CriteriaEntity criteriaEntity = criteriaRepository.findById(userInfoEntity.getCriteriaId()).get();

        String field = criteriaEntity.getField();
        String position = criteriaEntity.getPosition();
        String experience = criteriaEntity.getExperience();
        String typeWorking = criteriaEntity.getTypeWorking();
        String city = criteriaEntity.getCity();
        return getListPostCriteria(field,position,experience,typeWorking,city);
    }

    public List<PostResponse> getListPostCriteria(String field, String position, String experience,
                                                String typeWorking, String city) {
        StringBuilder queryBuilder = new StringBuilder(
                "SELECT p FROM PostEntity p " +
                        "LEFT JOIN CampaignEntity ce ON p.campaignId = ce.id " +
                        "LEFT JOIN PackageCampaign pc ON ce.id = pc.campaignId " +
                        "WHERE ce.isActive = TRUE AND p.status = 'APPROVED' AND "
        );
//        StringBuilder queryBuilder = new StringBuilder("SELECT p FROM PostEntity p WHERE ");
        List<String> conditions = new ArrayList<>();

        // Sinh các điều kiện động
        if (field != null) conditions.add("p.field = :field");
        if (position != null) conditions.add("p.position = :position");
        if (experience != null) conditions.add("p.experience = :experience");
        if (typeWorking != null) conditions.add("p.typeWorking = :typeWorking");
        if (city != null) conditions.add("p.city = :city");

        // Tạo tất cả tổ hợp có thể xảy ra (từ 3 điều kiện trở lên)
        List<String> combinations = generateCombinations(conditions, 3);

        // Nối tất cả các tổ hợp bằng OR
        queryBuilder.append(String.join(" OR ", combinations));

        // Tạo Query
        Query query = entityManager.createQuery(queryBuilder.toString(), PostEntity.class);

        // Gán giá trị cho các tham số
        if (field != null) query.setParameter("field", field);
        if (position != null) query.setParameter("position", position);
        if (experience != null) query.setParameter("experience", experience);
        if (typeWorking != null) query.setParameter("typeWorking", typeWorking);
        if (city != null) query.setParameter("city", city);
        List<PostEntity> postEntities = query.getResultList();
        List<PostResponse> listResult = new ArrayList<>();

        for (PostEntity x: postEntities
        ) {
            CampaignEntity campaignEntity = campaignRepository.findById(x.getCampaignId()).get();
            EnterpriseEntity enterprise = enterpriseRepository.findById(campaignEntity.getEnterpriseId()).get();
            PostResponse postResponse = new PostResponse();
            postResponse.setId(x.getId());
            postResponse.setQuantityCv(x.getQuantity());
            postResponse.setTitle(x.getTitle());
            postResponse.setTimeWorking(x.getTimeWorking());
            postResponse.setGender(x.getGender());
            postResponse.setLevel(x.getLevel());
            postResponse.setExperience(x.getExperience());
            postResponse.setTypeWorking(x.getTypeWorking());
            postResponse.setCity(x.getCity());
            postResponse.setNameCam(x.getTitle());
            postResponse.setDeadLine((int) ChronoUnit.DAYS.between(x.getDeadline(), LocalDateTime.now())*-1);
            postResponse.setSalaryRange(x.getSalaryRange());
            postResponse.setDescription(x.getDescription());
            postResponse.setInterest(x.getInterest());
            postResponse.setRequired(x.getRequired());
            postResponse.setLogoCompany(enterprise.getLogo());
            postResponse.setEnterpriseId(enterprise.getId());
            postResponse.setNameCompany(enterprise.getCompanyName());
            postResponse.setScales(enterprise.getScale());
            postResponse.setLabel(packageCampaignRepository.existsByCampaignIdAndPackageId(campaignEntity.getId(),"TA01"));
            listResult.add(postResponse);
        }
        return listResult;
    }

    private List<String> generateCombinations(List<String> conditions, int minSize) {
        List<String> combinations = new ArrayList<>();
        int n = conditions.size();

        // Sinh tổ hợp từ minSize đến n
        for (int i = minSize; i <= n; i++) {
            combinations.addAll(generateCombinationRecursive(conditions, new ArrayList<>(), 0, i));
        }
        return combinations;
    }

    private List<String> generateCombinationRecursive(List<String> conditions, List<String> current,
                                                      int start, int k) {
        List<String> result = new ArrayList<>();
        if (k == 0) {
            result.add(String.join(" AND ", current));
            return result;
        }

        for (int i = start; i < conditions.size(); i++) {
            current.add(conditions.get(i));
            result.addAll(generateCombinationRecursive(conditions, current, i + 1, k - 1));
            current.remove(current.size() - 1); // Backtrack
        }
        return result;
    }

    @Override
    public CriteriaEntity getCriteria(HttpServletRequest httpServletRequest) {
        UserEntity user = userRepository.findByUsername(jwtUntil.getUsernameFromRequest(httpServletRequest));
        UserInfoEntity userInfoEntity = userInfoRepository.findById(user.getUserInfoId()).get();
        if (userInfoEntity.getCriteriaId()==null){
            return new CriteriaEntity();
        }
        return criteriaRepository.findById(userInfoEntity.getCriteriaId()).get();
    }

    @Override
    public List<PostResponse> getListByMoney() {
        List<PostEntity> postEntities = postRepository.getListPostByMoney();
        List<PostResponse> listResult = new ArrayList<>();

        for (PostEntity x: postEntities
        ) {
            CampaignEntity campaignEntity = campaignRepository.findById(x.getCampaignId()).get();
            EnterpriseEntity enterprise = enterpriseRepository.findById(campaignEntity.getEnterpriseId()).get();
            PostResponse postResponse = new PostResponse();
            postResponse.setId(x.getId());
            postResponse.setQuantityCv(x.getQuantity());
            postResponse.setTitle(x.getTitle());
            postResponse.setCity(x.getCity());
            postResponse.setNameCam(x.getTitle());
            postResponse.setTimeWorking(x.getTimeWorking());
            postResponse.setGender(x.getGender());
            postResponse.setLevel(x.getLevel());
            postResponse.setExperience(x.getExperience());
            postResponse.setTypeWorking(x.getTypeWorking());
            postResponse.setDeadLine((int) ChronoUnit.DAYS.between(x.getDeadline(), LocalDateTime.now())*-1);
            postResponse.setSalaryRange(x.getSalaryRange());
            postResponse.setDescription(x.getDescription());
            postResponse.setInterest(x.getInterest());
            postResponse.setRequired(x.getRequired());
            postResponse.setLogoCompany(enterprise.getLogo());
            postResponse.setEnterpriseId(enterprise.getId());
            postResponse.setNameCompany(enterprise.getCompanyName());
            postResponse.setScales(enterprise.getScale());
            postResponse.setLabel(packageCampaignRepository.existsByCampaignIdAndPackageId(campaignEntity.getId(),"TA01"));
            listResult.add(postResponse);
        }
        return listResult;
    }

    @Override
    public List<PostEntity> getPostByCompany(String id) {
        return postRepository.getPostByCompany(id);
    }
}
