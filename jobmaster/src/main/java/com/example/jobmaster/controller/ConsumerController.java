package com.example.jobmaster.controller;

import com.example.jobmaster.entity.CVEntity;
import com.example.jobmaster.repository.CVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/consumer")
public class ConsumerController {

    @Autowired
    private CVRepository cvRepository;
    @PostMapping(value = "/send-cv")
    public ResponseEntity sendCv(@RequestBody CVEntity cvEntity){
        return ResponseEntity.ok(cvRepository.save(cvEntity));
    }

}
