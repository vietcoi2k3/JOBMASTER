package com.example.jobmaster.repository;

import com.example.jobmaster.entity.FieldEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FieldRepository extends JpaRepository<FieldEntity,String> {
    @Query("SELECT f FROM FieldEntity f WHERE "
            + "(:code IS NULL OR f.code = :code) AND "
            + "(:name IS NULL OR LOWER(f.name) LIKE LOWER(CONCAT('%', :name, '%')))")
    List<FieldEntity> findByCodeAndName(@Param("code") String code, @Param("name") String name);

    boolean existsByCode(String code);
}
