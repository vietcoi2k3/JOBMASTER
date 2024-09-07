package com.example.jobmaster.repository;

import com.example.jobmaster.entity.VerifyTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerifyTokenRepository extends JpaRepository<VerifyTokenEntity, Long> {
    VerifyTokenEntity findByToken(String token);
}
