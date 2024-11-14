package com.example.jobmaster.service.impl;

import com.example.jobmaster.dto.Response.*;
import com.example.jobmaster.entity.*;
import com.example.jobmaster.enumration.Time;
import com.example.jobmaster.exception.NotFoundException;
import com.example.jobmaster.repository.*;
import com.example.jobmaster.security.jwt.JWTUntil;
import com.example.jobmaster.service.IAdminService;
import com.example.jobmaster.until.constants.ExceptionMessage;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AdminServiceImpl implements IAdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CriteriaRepository criteriaRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private JWTUntil jwtUntil;

    @Autowired
    private VerifyTokenRepository tokenRepository;

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
                .totalPage(page.getTotalPages())
                .build();
    }

    @Override
    public PageResponse<EnterpriseResponse> getListAdmin(int pageSize, int pageNumber) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<EnterpriseResponse> page = enterpriseRepository.getListAdmin(pageable);
        return PageResponse.<EnterpriseResponse>builder()
                .data(page.getContent())
                .totalPage(page.getTotalPages())
                .build();
    }

    @Override
    public PageResponse<EnterpriseManagement> getListCertificate(int pageSize, int pageNumber, String status, String username) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<EnterpriseManagement> page = enterpriseRepository.getListCertificate(status,username,pageable);
        return PageResponse.<EnterpriseManagement>builder()
                .data(page.getContent())
                .totalPage(page.getTotalPages())
                .build();
    }

    @Override
    public PageResponse<CampaignManagement> getListCampaign(int pageSize, int pageNumber, String campaignName, String tax) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<CampaignManagement> page = campaignRepository.getListCampaignAdmin(campaignName,tax,pageable);
        return PageResponse.<CampaignManagement>builder()
                .data(page.getContent())
                .totalPage(page.getTotalPages())
                .build();
    }

    @Override
    public List<PackageResponse> getListPackageAdmin( Time time) {
        // Khởi tạo thời gian bắt đầu và kết thúc
        LocalDateTime startDate;
        LocalDateTime endDate = LocalDateTime.now(); // Thời điểm hiện tại

        // Xử lý các khoảng thời gian dựa trên tham số 'time'
        if (time.equals(Time.DAY)) {
            startDate = endDate.truncatedTo(ChronoUnit.DAYS); // Đầu ngày hiện tại
        } else if (time.equals(Time.MONTH)) {
            startDate = endDate.withDayOfMonth(1).truncatedTo(ChronoUnit.DAYS); // Đầu tháng
        } else if (time.equals(Time.YEAR)) {
            startDate = endDate.withDayOfYear(1).truncatedTo(ChronoUnit.DAYS); // Đầu năm
        } else {
            throw new IllegalArgumentException("Invalid time parameter"); // Xử lý lỗi nếu tham số không hợp lệ
        }

        // Lấy danh sách các package
        List<PackageEntity> packageEntities = packageRepository.findAll();
        List<PackageResponse> packageResponses = new ArrayList<>();

        // Lặp qua từng package và tạo response
        for (PackageEntity x : packageEntities) {
            PackageResponse packageResponse = new PackageResponse();
            packageResponse.setNamePackage(x.getName());

            // Gọi hàm repository để tính tổng giá trị của package
            BigDecimal totalPrice = packageRepository.totalValueOfPackage(
                    startDate, endDate, x.getId()
            );
            if (totalPrice == null) {
                totalPrice = BigDecimal.ZERO;
            } 

            packageResponse.setPrice(totalPrice);
            packageResponses.add(packageResponse);
        }

        // Trả về kết quả (đoạn này cần được sửa theo mục đích trả về của bạn)

        return packageResponses;
    }

    @Override
    public PageResponse<PostManagement> getListPost(int pageNumber,int pageSize,String postName, String tax) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<PostManagement> page = postRepository.getListPostAdmin(postName,tax,pageable);
        return PageResponse.<PostManagement>builder()
                .data(page.getContent())
                .totalPage(page.getTotalPages())
                .build();
    }

    @Override
    public PostEntity getDetailPost(String id) {
        return postRepository.findById(id).get();
    }

    @Override
    public PostEntity updateStatusPost(String id, PostEnum status) {
        PostEntity postEntity = postRepository.findById(id).get();
        postEntity.setStatus(status.name());
        return postRepository.save(postEntity);
    }

    @Override
    public EnterpriseEntity updateStatusEnterprise(String status, String id) {
        EnterpriseEntity enterprise = enterpriseRepository.findById(id).get();
        enterprise.setIsActive(status);
        return enterpriseRepository.save(enterprise);
    }

    @Override
    public List<EnterpriseEntity> getListEnterprise(int pageNumber, int pageSize) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        List<EnterpriseEntity> page = enterpriseRepository.getListCompany();
        return page;
    }

    @Override
    public PageResponse<EnterpriseResponse> getListCompany(int pageSize, int pageNumber) {
        return null;
    }

    @Override
    public CampaignEntity updateStatusCampaign(String campaignId, boolean status) {
        CampaignEntity campaignEntity = campaignRepository.findById(campaignId)
                .orElseThrow(()->new NotFoundException(ExceptionMessage.CAMPAIGN_NOT_FOUND));
        campaignEntity.setActive(status);
        campaignRepository.save(campaignEntity);
        if(campaignEntity.getPostId()!=null){
            Optional<PostEntity> postEntity = postRepository.findById(campaignEntity.getPostId());
            if(postEntity.isPresent()){
                postEntity.get().setStatus(PostEnum.NOT_APPROVED.name());
                postRepository.save(postEntity.get());
            }
        }
        return campaignEntity;
    }

    @Override
    public PageResponse<FieldEntity> getListField(int pageSize, int pageNumber, String code, String name) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<FieldEntity> page = fieldRepository.findByCodeAndName(code,name,pageable);
        return PageResponse.<FieldEntity>builder()
                .data(page.getContent())
                .totalPage(page.getTotalPages())
                .build();
    }

    @Override
    public PageResponse<PositionEntity> getListPosition(int pageSize, int pageNumber, String code, String name) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<PositionEntity> page = positionRepository.findByCodeAndName(code,name,pageable);
        return PageResponse.<PositionEntity>builder()
                .data(page.getContent())
                .totalPage(page.getTotalPages())
                .build();
    }

    @Override
    public String updateStatusCandidate(String username, String status) {
        UserEntity user = userRepository.findByUsername(username);
        user.setIsActive(status);

        userRepository.save(user);
        return "done";
    }

    @Override
    public String updateStatusAccountEnterprise(String username, String status) {
        UserEntity user = userRepository.findByUsername(username);
        user.setIsActive(status);

        userRepository.save(user);
        return "done";
    }


}
