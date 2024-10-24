package com.example.jobmaster.repository;

import com.example.jobmaster.entity.PostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<PostEntity,String> {
    @Query("SELECT c FROM PostEntity c WHERE c.title LIKE %:search% AND c.campaignId IN :campaignId")
    Page<PostEntity> getListCampaign(@Param("search") String search, @Param("campaignId") List<String> campaignId, Pageable pageable);

    @Query("SELECT c FROM PostEntity c " +
            "LEFT JOIN CampaignEntity ce ON c.campaignId = ce.id " +
            "LEFT JOIN PackageCampaign pc ON ce.id= pc.campaignId " +
            "WHERE " +
            "c.title LIKE CONCAT('%', :search, '%') " +
            "AND c.city LIKE CONCAT('%', :address, '%') " +
            "AND c.field LIKE CONCAT('%', :field, '%') " +
            "AND ce.isActive = TRUE AND c.status = 'APPROVED' " +
            "ORDER BY CASE WHEN pc.packageId='SP01' THEN 0 ELSE 1 END" )
    Page<PostEntity> getListPost(@Param("search") String search, @Param("address") String address, @Param("field") String field, Pageable pageable);

    @Query("SELECT c FROM PostEntity c " +
            "LEFT JOIN CampaignEntity ce ON c.campaignId = ce.id " +
            "LEFT JOIN PackageCampaign pc ON ce.id= pc.campaignId " +
            "WHERE " +
            "ce.isActive = TRUE AND c.status = 'APPROVED' " +
            "AND pc.packageId='MJ01' " )
    List<PostEntity> getListPostByMoney();

    @Query("SELECT c FROM PostEntity c")
    Page<PostEntity> getListPostAdmin( Pageable pageable);

}
