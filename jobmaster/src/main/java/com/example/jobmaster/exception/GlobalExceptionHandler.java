package com.example.jobmaster.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionHandler {
    // Xử lý lỗi không tìm thấy (404)
    @ExceptionHandler(RuntimeException.class)
    @ResponseBody
    public ResponseEntity<String> handleResourceNotFoundException(RuntimeException ex) {
        // Log lỗi nếu cần
        ex.printStackTrace();
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
