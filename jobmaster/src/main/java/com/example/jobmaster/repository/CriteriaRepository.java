package com.example.jobmaster.repository;

import com.example.jobmaster.entity.CriteriaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CriteriaRepository extends JpaRepository<CriteriaEntity,String> {

}
