package com.example.jobmaster.service.impl;

import com.cloudinary.Cloudinary;
import com.example.jobmaster.entity.FileEntity;
import com.example.jobmaster.repository.FileRepository;
import com.example.jobmaster.service.IFileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class FileUploadServiceImpl implements IFileUploadService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private FileRepository fileRepository;
    public FileEntity uploadFile(byte[] bytes, String fileType) throws IOException {
        FileEntity fileEntity = new FileEntity();
        Map<String, Object> uploadParams = new HashMap<>();
        uploadParams.put("public_id", UUID.randomUUID().toString());

        // Kiểm tra fileType để đặt resource_type phù hợp
        if (fileType.equalsIgnoreCase("pdf")) {
            uploadParams.put("resource_type", "raw");
        } else {
            uploadParams.put("resource_type", "auto");
        }

        String url = cloudinary.uploader()
                .upload(bytes, uploadParams)
                .get("url")
                .toString();

        fileEntity.setUrl(url);
        return fileRepository.save(fileEntity);
    }

}
