package com.example.jobmaster.service;

import com.example.jobmaster.entity.FileEntity;

import java.io.IOException;

public interface IFileUploadService {
    public FileEntity uploadFile(byte[] bytes) throws IOException;
}
