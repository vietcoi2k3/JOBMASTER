package com.example.jobmaster.repository;

import com.example.jobmaster.dto.Response.PostManagement;
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
    @Query("SELECT c FROM PostEntity c WHERE c.title LIKE %:search% AND (:status is null or c.status = :status) AND c.campaignId IN :campaignId order by c.modifiedAt desc ")
    Page<PostEntity> getListCampaign(@Param("search") String search,@Param("status") String status, @Param("campaignId") List<String> campaignId, Pageable pageable);

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

    @Query("""
        select 
               p.id as id, 
               p.title as postName,
               c.name as campaignName,
               e.tax as tax,
               p.status as status
        from PostEntity p 
        join CampaignEntity c on c.id = p.campaignId
        join EnterpriseEntity e on e.id = c.enterpriseId
        where ( :postName is null or p.title LIKE CONCAT('%', :postName, '%')) 
                and (:tax is null or e.tax is null or e.tax LIKE CONCAT('%', :tax, '%'))
        order by p.createdAt desc 
""")
    Page<PostManagement> getListPostAdmin(String postName, String tax,Pageable pageable);

    @Query("SELECT c FROM PostEntity c INNER JOIN CampaignEntity ce ON c.campaignId = ce.id " +
            "WHERE ce.enterpriseId =:enterpriseId")
    List<PostEntity> getPostByCompany(@Param("enterpriseId") String enterpriseId);
    @Query("select count(p) from PostEntity p join CampaignEntity c on p.campaignId = c.id where c.enterpriseId=:enterpriseId and p.status ='APPROVED'")
    Integer countPostDisplaying(String enterpriseId);

}
