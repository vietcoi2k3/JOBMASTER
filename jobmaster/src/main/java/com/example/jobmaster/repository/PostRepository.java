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

    @Query("SELECT c FROM PostEntity c WHERE c.title LIKE CONCAT('%', :search, '%') AND c.city LIKE CONCAT('%', :address, '%') AND c.field LIKE CONCAT('%', :field, '%')")
    Page<PostEntity> getListPost(@Param("search") String search, @Param("address") String address, @Param("field") String field, Pageable pageable);

}
