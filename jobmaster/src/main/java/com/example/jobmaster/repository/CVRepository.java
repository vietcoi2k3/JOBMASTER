package com.example.jobmaster.repository;

import com.example.jobmaster.entity.CVEntity;
import com.example.jobmaster.entity.StatusCVEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CVRepository extends JpaRepository<CVEntity,String> {

    int countByPostId(String postId);

    @Query(value = "select c from CVEntity c where c.postId=:postId and (:status is null or c.status =:status)")
    Page<CVEntity> getListCv(String postId, StatusCVEnum status, Pageable pageable);
}
