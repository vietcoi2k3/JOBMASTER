package com.example.jobmaster.service.impl;

import com.example.jobmaster.dto.Response.CompanyResponse;
import com.example.jobmaster.dto.Response.PageResponse;
import com.example.jobmaster.dto.Response.PostResponse;
import com.example.jobmaster.entity.*;
import com.example.jobmaster.repository.*;
import com.example.jobmaster.security.jwt.JWTUntil;
import com.example.jobmaster.service.IConsumerService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
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

    @Override
    public CriteriaEntity addCriteriaEntity(CriteriaEntity criteriaEntity, HttpServletRequest httpServletRequest) {
        UserEntity user = userRepository.findByUsername(jwtUntil.getUsernameFromRequest(httpServletRequest));
        criteriaEntity.setUserId(user.getId());
        return criteriaRepository.save(criteriaEntity);
    }

    @Override
    public List<PostEntity> getListPostByCriteria(HttpServletRequest httpServletRequest
     ) {
        UserEntity user = userRepository.findByUsername(jwtUntil.getUsernameFromRequest(httpServletRequest));
        CriteriaEntity criteriaEntity = criteriaRepository.findByUserId(user.getId());
        String field = criteriaEntity.getField();
        String position = criteriaEntity.getPosition();
        String experience = criteriaEntity.getExperience();
        String typeWorking = criteriaEntity.getTypeWorking();
        String city = criteriaEntity.getCity();
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<PostEntity> query = cb.createQuery(PostEntity.class);
        Root<PostEntity> root = query.from(PostEntity.class);

        // Danh sách các điều kiện động
        List<Predicate> predicates = new ArrayList<>();

        if (field != null && !field.trim().isEmpty()) {
            predicates.add(cb.equal(root.get("field"), field));
        }
        if (position != null && !position.trim().isEmpty()) {
            predicates.add(cb.equal(root.get("position"), position));
        }
        if (typeWorking != null && !typeWorking.trim().isEmpty()) {
            predicates.add(cb.equal(root.get("typeWorking"), typeWorking));
        }
        if (experience != null && !experience.trim().isEmpty()) {
            predicates.add(cb.equal(root.get("experience"), experience));
        }
        if (city != null && !city.trim().isEmpty()) {
            predicates.add(cb.equal(root.get("city"), city));
        }

        // Chỉ lấy bài đăng thỏa ít nhất 2 điều kiện
        if (predicates.size() >= 2) {
            query.where(cb.or(predicates.toArray(new Predicate[0])));
        }

        return entityManager.createQuery(query).getResultList();
    }
}
