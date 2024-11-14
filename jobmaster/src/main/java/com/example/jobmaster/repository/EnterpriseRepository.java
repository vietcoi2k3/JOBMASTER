package com.example.jobmaster.repository;

import com.example.jobmaster.dto.Response.EnterpriseManagement;
import com.example.jobmaster.dto.Response.EnterpriseResponse;
import com.example.jobmaster.entity.EnterpriseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Class: EnterpriseRepository
 * Author: ACER
 * Date: 9/3/2024
 * Description: [Your description here]
 */

@Repository
public interface EnterpriseRepository extends JpaRepository<EnterpriseEntity,String> {
    EnterpriseEntity findByUserId(String userId);

    @Query("SELECT new com.example.jobmaster.dto.Response.EnterpriseResponse(u.username, c.companyName, u.isActive) " +
            "FROM EnterpriseEntity c INNER JOIN UserEntity u ON c.userId = u.id group by u.username, c.companyName, u.isActive" +
            " order by  MAX(c.modifiedAt) desc ")
    Page<EnterpriseResponse> getListAdmin(Pageable pageable);

    @Query("""
        select e.companyName as enterpriseName,
        u.username as username,
        e.address as address,
        e.isActive as status,
        e.businessCertificate as businessCertificate,
        e.id as id
        from EnterpriseEntity e 
        join UserEntity u on u.id = e.userId
        where (:status IS NULL OR :status = '' OR e.isActive = :status) and (:username is null or u.username LIKE CONCAT('%', :username, '%') )
        order by e.createdAt desc 
""")
    Page<EnterpriseManagement> getListCertificate(String status, String username, Pageable pageable);

    @Query("SELECT c " +
            "FROM EnterpriseEntity c " +
            "INNER JOIN CampaignEntity ce ON c.id = ce.enterpriseId " +
            "INNER JOIN PackageCampaign pc ON ce.id = pc.campaignId " +
            "WHERE c.isActive = 'ACTIVE' " +
            " order by  c.modifiedAt desc ")
    List<EnterpriseEntity> getListCompany();

    @Query("""
        select e from EnterpriseEntity e 
        left join UserEntity u on u.enterpriseId = e.id
        where u.username = :username
""")
    Optional<EnterpriseEntity> findEnterpriseEntityByUsername(@Param("username") String username);
}
