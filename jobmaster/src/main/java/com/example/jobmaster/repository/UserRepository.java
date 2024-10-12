package com.example.jobmaster.repository;

import com.example.jobmaster.entity.EnterpriseEntity;
import com.example.jobmaster.entity.UserEntity;
import com.example.jobmaster.entity.UserInfoEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Class: UserRepository
 * Author: ACER
 * Date: 8/30/2024
 * Description: [Your description here]
 */

@Repository
public interface UserRepository extends JpaRepository<UserEntity,String> {

    UserEntity findByUsername(String username);
    boolean existsByGoogleId(String googleId);

    boolean existsByUsername(String username);




}
