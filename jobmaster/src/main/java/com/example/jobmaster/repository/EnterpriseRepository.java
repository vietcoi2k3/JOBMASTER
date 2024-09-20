package com.example.jobmaster.repository;

import com.example.jobmaster.entity.EnterpriseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Class: EnterpriseRepository
 * Author: ACER
 * Date: 9/3/2024
 * Description: [Your description here]
 */

@Repository
public interface EnterpriseRepository extends JpaRepository<EnterpriseEntity,String> {
    EnterpriseEntity findByUserId(String userId);
}
