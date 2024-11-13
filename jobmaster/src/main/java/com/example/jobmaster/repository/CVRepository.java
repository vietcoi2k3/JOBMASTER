package com.example.jobmaster.repository;

import com.example.jobmaster.dto.NewsChart;
import com.example.jobmaster.entity.CVEntity;
import com.example.jobmaster.entity.StatusCVEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface CVRepository extends JpaRepository<CVEntity,String> {

    int countByPostId(String postId);

    @Query(value = "select c from CVEntity c where c.postId=:postId and (:status is null or c.status =:status)")
    Page<CVEntity> getListCv(String postId, StatusCVEnum status, Pageable pageable);

    @Query("""
        select count(cv.id) from CVEntity cv
        join PostEntity p on cv.postId = p.id
        join CampaignEntity c on p.id = c.postId
        where c.enterpriseId = :enterpriseId
        and DATE(cv.createdAt) = current date 
        order by cv.createdAt
""")
    Integer countCvOpening(String enterpriseId);

    @Query("""
        select count(cv.id) 
        from CVEntity cv
        join PostEntity p on cv.postId = p.id
        join CampaignEntity c on p.id = c.postId
        where c.enterpriseId = :enterpriseId
        and DATE(cv.modifiedAt) = current date 
        and cv.status = 'HIRED'
""")
    Integer countWorkCv(String enterpriseId);

    @Query("""
        SELECT 
            COUNT(cv.id) AS totalCandidate,
            SUM(CASE WHEN cv.status = 'HIRED' THEN 1 ELSE 0 END) AS offeredCv,
            FUNCTION('MONTH', cv.createdAt) AS month,
            FUNCTION('YEAR', cv.createdAt) AS year
        FROM CVEntity cv
        JOIN PostEntity p ON cv.postId = p.id
        JOIN CampaignEntity c ON p.campaignId = c.id
        WHERE c.enterpriseId = :enterpriseId
        AND cv.createdAt >= :twelveMonthsAgo
        GROUP BY year, month
        order by year,month
    """)
    List<NewsChart> getNewsChart(@Param("enterpriseId") String enterpriseId, @Param("twelveMonthsAgo") Date twelveMonthsAgo );
}
