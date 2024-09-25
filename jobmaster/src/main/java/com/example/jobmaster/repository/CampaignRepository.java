package com.example.jobmaster.repository;

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

    @Query("SELECT c FROM CampaignEntity c WHERE c.name  LIKE %:search% AND c.enterpriseId = :enterpriseId")
    Page<CampaignEntity> getListCampaign(@Param("search") String search, @Param("enterpriseId") String enterpriseId, Pageable pageable);

    @Query("SELECT c.id FROM CampaignEntity c WHERE c.enterpriseId=:enterpriseId and c.id IS NOT NULL")
    List<String> getListIdCampaign(@Param("enterpriseId") String enterpriseId);

}
