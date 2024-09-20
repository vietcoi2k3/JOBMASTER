package com.example.jobmaster.service.impl;


import com.example.jobmaster.entity.FileEntity;
import com.example.jobmaster.entity.UserEntity;
import com.example.jobmaster.repository.FileRepository;
import com.example.jobmaster.service.IFileService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileServiceIml implements IFileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private FileRepository fileRepository;
    @Override
    public FileEntity uploadFile(MultipartFile file, HttpServletRequest httpServletRequest) {
        if (file.isEmpty()) {
            throw new RuntimeException("File null");
        }
        FileEntity fileEntity = new FileEntity();
        fileEntity = fileRepository.save(fileEntity);
        try {
            // Kiểm tra và tạo thư mục nếu chưa tồn tại
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Lưu file vào thư mục uploadDir
            byte[] bytes = file.getBytes();

            Path path = Paths.get(uploadDir + File.separator + fileEntity.getId()+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")));
            Files.write(path, bytes);
            fileEntity.setUrl(path.toString());
            fileEntity = fileRepository.save(fileEntity);

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("fail");
        }
        return fileEntity;
    }

    @Override
    public ResponseEntity<byte[]> getFile(String fileId) throws IOException {
        FileEntity fileEntity = fileRepository.findById(fileId).orElseThrow(() -> new RuntimeException("File not found: " + fileId));
        Path filePath = Paths.get(fileEntity.getUrl());

        // Kiểm tra xem tệp có tồn tại không
        File file = filePath.toFile();
        if (!file.exists()) {
            throw new RuntimeException("File not found: " + fileId);
        }

        byte[] fileBytes = Files.readAllBytes(filePath);
        String mimeType = Files.probeContentType(filePath); // Lấy loại MIME của file

        return ResponseEntity
                .ok()
                .contentType(MediaType.parseMediaType(mimeType)) // Đặt MIME type
                .body(fileBytes);
    }

    @Override
    public byte[] getCertificate(String enterpriseId) throws IOException {
        FileEntity fileEntity = fileRepository.fileCertificateByEnterprise(enterpriseId);
        if (fileEntity==null){
            return null;
        }
        return this.getFile(fileEntity.getId()).getBody();
    }

}
