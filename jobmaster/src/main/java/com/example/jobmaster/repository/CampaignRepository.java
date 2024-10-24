package com.example.jobmaster.repository;

import com.example.jobmaster.dto.Response.CampaignResponse;
import com.example.jobmaster.entity.CampaignEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<CampaignEntity,String> {

    @Query(value = """ 
        SELECT c.id AS id, 
               c.name AS name, 
               c.quantity AS quantity, 
               c.start_date AS startDate,
               c.end_date AS endDate, 
               c.is_active AS isActive, 
               p.position AS position,
               p.id AS postId,
               p.status AS postStatus,
               p.title AS titlePost,
               count(cv.id) as cvQuantity
        FROM campaign_entity c 
        LEFT JOIN post_entity p ON p.id = c.post_id
        LEFT JOIN cventity cv ON p.id = cv.post_id
        WHERE (LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%')) 
        OR LOWER(p.position) LIKE LOWER(CONCAT('%', :search, '%')))
        AND c.enterprise_id = :enterpriseId
        group by c.id, p.id
        """, nativeQuery = true)
    Page<CampaignResponse> getListCampaign(@Param("search") String search, @Param("enterpriseId") String enterpriseId, Pageable pageable);

    @Query("SELECT c.id FROM CampaignEntity c WHERE c.enterpriseId=:enterpriseId and c.id IS NOT NULL")
    List<String> getListIdCampaign(@Param("enterpriseId") String enterpriseId);

    @Query("SELECT c FROM CampaignEntity c WHERE c.name  LIKE %:search% ")
    Page<CampaignEntity> getListCampaignAdmin(@Param("search") String search, Pageable pageable);

    @Query(value = """ 
        SELECT c.id AS id, 
               c.name AS name, 
               c.quantity AS quantity, 
               c.start_date AS startDate,
               c.end_date AS endDate, 
               c.is_active AS isActive, 
               p.position AS position,
               p.id AS postId,
               p.status AS postStatus,
               p.title AS titlePost,
               count(cv.id) as cvQuantity
        FROM campaign_entity c 
        LEFT JOIN post_entity p ON p.id = c.post_id
        LEFT JOIN cventity cv ON p.id = cv.post_id
        WHERE
         c.enterprise_id = :enterpriseId
        AND c.post_id IS NULL
        group by c.id, p.id
        """, nativeQuery = true)
    List<CampaignResponse> getListCampaignForPost(@Param("enterpriseId") String enterpriseId);


}
