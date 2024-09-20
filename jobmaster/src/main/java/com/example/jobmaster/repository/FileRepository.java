package com.example.jobmaster.repository;

import com.example.jobmaster.entity.FileEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.io.File;

@Repository
public interface FileRepository extends JpaRepository<FileEntity,String> {

    @Query(value = "SELECT c FROM FileEntity c WHERE c.enterpriseId=:enterpriseId AND c.isActive = true AND c.type = 'CERTIFICATE_BUSINESS'")
    FileEntity fileCertificateByEnterprise(String enterpriseId);


    @Modifying
    @Transactional
    @Query(value = "UPDATE FileEntity c \n" +
            "SET c.isActive = false \n" +
            "WHERE c.enterpriseId = :enterpriseId \n" +
            "AND c.type = 'CERTIFICATE_BUSINESS'")
    void setFileActiveIsFalse(String enterpriseId);
}
