package com.example.jobmaster.repository;

import com.example.jobmaster.dto.Response.UserInfoResponse;
import com.example.jobmaster.entity.UserInfoEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfoEntity,String> {
    @Query("SELECT new com.example.jobmaster.dto.Response.UserInfoResponse(u.username, u.fullName, u.isActive) " +
            "FROM UserInfoEntity c INNER JOIN UserEntity u ON c.userId = u.id " +
            "GROUP BY u.username, u.fullName, u.isActive " +  // nhóm theo các thuộc tính của u
            "ORDER BY MAX(c.modifiedAt) DESC")  // lấy bản ghi có thời gian sửa đổi gần nhất
    Page<UserInfoResponse> getListCandidate(Pageable pageable);
}
