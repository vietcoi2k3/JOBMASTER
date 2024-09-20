package com.example.jobmaster.service;

import com.example.jobmaster.entity.FileEntity;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IFileService {

    public FileEntity uploadFile(MultipartFile multipartFile, HttpServletRequest httpServletRequest);

    public ResponseEntity<byte[]> getFile(String fileId) throws IOException;

    public byte[] getCertificate(String enterpriseId) throws IOException;
}
