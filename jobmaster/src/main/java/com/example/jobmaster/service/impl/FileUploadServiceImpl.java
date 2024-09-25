package com.example.jobmaster.service.impl;

import com.cloudinary.Cloudinary;
import com.example.jobmaster.entity.FileEntity;
import com.example.jobmaster.service.IFileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class FileUploadServiceImpl implements IFileUploadService {

    @Autowired
    private Cloudinary cloudinary;
    public FileEntity uploadFile( byte[] bytes) throws IOException {
        FileEntity fileEntity = new FileEntity();
        String url = cloudinary.uploader()
                .upload(bytes,
                        Map.of("public_id", UUID.randomUUID().toString(),
                                "resource_type", "auto"))
                .get("url")
                .toString();
        fileEntity.setUrl(url);
        return fileEntity;
    }
}
