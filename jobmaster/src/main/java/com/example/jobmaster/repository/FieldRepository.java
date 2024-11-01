package com.example.jobmaster.repository;

import com.example.jobmaster.entity.FieldEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface FieldRepository extends JpaRepository<FieldEntity,String> {
    @Query("SELECT f FROM FieldEntity f WHERE "
            + "(:code IS NULL OR LOWER(f.code) LIKE LOWER(CONCAT('%', :code, '%'))) AND "
            + "(:name IS NULL OR LOWER(f.name) LIKE LOWER(CONCAT('%', :name, '%')))")
    Page<FieldEntity> findByCodeAndName(@Param("code") String code, @Param("name") String name, Pageable pageable);

    boolean existsByCode(String code);
}
