package com.example.jobmaster.repository;

import com.example.jobmaster.entity.PackageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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
}
