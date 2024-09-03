package com.example.jobmaster.repository;

import com.example.jobmaster.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Class: RoleRepository
 * Author: ACER
 * Date: 9/3/2024
 * Description: [Your description here]
 */

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity,Integer> {
}
