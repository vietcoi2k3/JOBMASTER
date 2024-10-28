package com.example.jobmaster.repository;

import com.example.jobmaster.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Class: RoleRepository
 * Author: ACER
 * Date: 9/3/2024
 * Description: [Your description here]
 */

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity,Integer> {
    @Query(value = """
        select r.id, r.name,r.created_at,r.modified_at from role r 
        join user_roles ur on r.id = ur.role_id
        join user u on u.id = ur.user_id
        where u.username = :username
""",nativeQuery = true)
    List<RoleEntity> getRoleByUsername(String username);
}
