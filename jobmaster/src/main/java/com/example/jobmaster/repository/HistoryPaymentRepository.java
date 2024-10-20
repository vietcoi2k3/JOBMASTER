package com.example.jobmaster.repository;

import com.example.jobmaster.entity.HistoryMoney;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryPaymentRepository extends JpaRepository<HistoryMoney,String> {

    List<HistoryMoney> findAllByUserIdOrderByCreatedAtDesc(String userId);
}
