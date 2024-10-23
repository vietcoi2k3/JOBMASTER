package com.example.jobmaster.controller;

import com.example.jobmaster.entity.CVEntity;
import com.example.jobmaster.entity.CriteriaEntity;
import com.example.jobmaster.repository.CVRepository;
import com.example.jobmaster.service.IConsumerService;
import jakarta.servlet.http.HttpServletRequest;
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

    @Autowired
    private IConsumerService iConsumerService;
    @PostMapping(value = "/send-cv")
    public ResponseEntity sendCv(@RequestBody CVEntity cvEntity){
        return ResponseEntity.ok(cvRepository.save(cvEntity));
    }
    ;
    @PostMapping(value = "/add-criteria")
    public ResponseEntity addCriteria(@RequestBody CriteriaEntity criteriaEntity, HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(iConsumerService.addCriteriaEntity(criteriaEntity,httpServletRequest));
    }

    @PostMapping(value = "/get-list-post")
    public ResponseEntity getCampaignByCriteria(HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(iConsumerService.getListPostByCriteria(httpServletRequest));
    }
}
