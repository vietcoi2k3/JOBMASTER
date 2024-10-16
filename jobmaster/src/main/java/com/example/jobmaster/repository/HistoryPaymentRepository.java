package com.example.jobmaster.repository;

import com.example.jobmaster.entity.HistoryMoney;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryPaymentRepository extends JpaRepository<HistoryMoney,String> {
}
