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

    @Query(
            value = "SELECT * FROM ( " +
                    "SELECT c.*,pc.package_id,pc.expired, " +
                    "ROW_NUMBER() OVER (PARTITION BY c.id ORDER BY (CASE WHEN pc.package_id = 'SP01' THEN 0 ELSE 1 END)) AS rn " +
                    "FROM post_entity c " +
                    "LEFT JOIN campaign_entity ce ON c.campaign_id = ce.id " +
                    "LEFT JOIN package_campaign pc ON ce.id = pc.campaign_id " +
                    "WHERE " +
                    "(:search IS NULL OR c.title LIKE CONCAT('%', :search, '%')) " +
                    "AND (:address IS NULL OR c.city LIKE CONCAT('%', :address, '%')) " +
                    "AND (:field IS NULL OR c.field LIKE CONCAT('%', :field, '%')) " +
                    "AND ce.is_active = TRUE AND c.status = 'APPROVED' " +
                    ") AS subquery " +
                    "WHERE rn = 1 " + // Chọn bản ghi đầu tiên cho mỗi id
                    "ORDER BY  (CASE WHEN package_id = 'SP01' AND expired  >= CURRENT_DATE THEN 0 ELSE 1 END),modified_at" , // Sắp xếp theo thứ tự mà không cần dùng c.id

            countQuery = "SELECT COUNT(DISTINCT c.id) FROM post_entity c " +
                    "LEFT JOIN campaign_entity ce ON c.campaign_id = ce.id " +
                    "LEFT JOIN package_campaign pc ON ce.id = pc.campaign_id " +
                    "WHERE " +
                    "(:search IS NULL OR c.title LIKE CONCAT('%', :search, '%')) " +
                    "AND (:address IS NULL OR c.city LIKE CONCAT('%', :address, '%')) " +
                    "AND (:field IS NULL OR c.field LIKE CONCAT('%', :field, '%')) " +
                    "AND ce.is_active = TRUE AND c.status = 'APPROVED'",

            nativeQuery = true
    )
    Page<PostEntity> getListPost(
            @Param("search") String search,
            @Param("address") String address,
            @Param("field") String field,
            Pageable pageable
    );



    @Query("SELECT c FROM PostEntity c " +
            "LEFT JOIN CampaignEntity ce ON c.campaignId = ce.id " +
            "LEFT JOIN PackageCampaign pc ON ce.id= pc.campaignId " +
            "WHERE " +
            "ce.isActive = TRUE AND c.status = 'APPROVED' AND pc.expired  >= CURRENT_DATE " +
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
