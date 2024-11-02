package com.example.jobmaster.repository;

import com.example.jobmaster.entity.PackageCampaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PackageCampaignRepository extends JpaRepository<PackageCampaign,String> {

    @Query("SELECT c.packageId FROM PackageCampaign c WHERE c.campaignId =:campaignId GROUP BY c.packageId")
    List<String> getListIdPackage(@Param("campaignId") String campaignId);

    boolean existsByCampaignIdAndPackageIdAndExpiredAfter(
            String campaignId, String packageId, LocalDate expired);
}
