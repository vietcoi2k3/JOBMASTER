package com.example.jobmaster.repository;

import com.example.jobmaster.entity.PackageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PackageRepository extends JpaRepository<PackageEntity,String> {


    @Query("SELECT COALESCE(SUM(p.price), 0) FROM PackageCampaign c " +
            "INNER JOIN PackageEntity p ON p.id = c.packageId " +
            "WHERE c.packageId = :packageId " +
            "AND c.createdAt >= :startDate AND c.createdAt < :endDate " +
            "GROUP BY c.packageId")
    BigDecimal totalValueOfPackage(@Param("startDate") LocalDateTime startDate,
                                   @Param("endDate") LocalDateTime endDate,
                                   @Param("packageId") String packageId);

    @Query(value = "SELECT p FROM PackageEntity p " +
            "WHERE p.id NOT IN (" +
            "SELECT pc.packageId FROM PackageCampaign pc WHERE pc.campaignId = :idCam)")
    List<PackageEntity> getPackageByCampaign(@Param("idCam")String idCam);
}
