package com.example.jobmaster.service;

import java.io.IOException;

public interface IFileUploadService {
    public String uploadFile( byte[] bytes) throws IOException;
}
