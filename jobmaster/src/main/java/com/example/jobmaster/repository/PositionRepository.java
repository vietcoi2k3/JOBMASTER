package com.example.jobmaster.repository;

import com.example.jobmaster.entity.FieldEntity;
import com.example.jobmaster.entity.PositionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PositionRepository extends JpaRepository<PositionEntity,String> {
    @Query("SELECT f FROM PositionEntity f WHERE "
            + "(:code IS NULL OR f.code = :code) AND "
            + "(:name IS NULL OR LOWER(f.name) LIKE LOWER(CONCAT('%', :name, '%')))")
    List<PositionEntity> findByCodeAndName(@Param("code") String code, @Param("name") String name);
}
