package com.example.jobmaster.controller;

import com.example.jobmaster.dto.CampaignDTO;
import com.example.jobmaster.dto.EnterpriseDTO;
import com.example.jobmaster.dto.PostDTO;
import com.example.jobmaster.entity.FileEntity;
import com.example.jobmaster.entity.UserEntity;
import com.example.jobmaster.repository.FieldRepository;
import com.example.jobmaster.repository.PositionRepository;
import com.example.jobmaster.repository.PostRepository;
import com.example.jobmaster.repository.UserRepository;
import com.example.jobmaster.security.jwt.JWTUntil;
import com.example.jobmaster.service.IEnterpiseService;
import com.example.jobmaster.service.IFileService;
import com.example.jobmaster.service.impl.EnterpriseServiceImpl;
import com.example.jobmaster.until.constants.DefautlConstants;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

/**
 * Class: EnterpriseController
 * Author: ACER
 * Date: 9/2/2024
 * Description: [Your description here]
 */

@RequestMapping(value = "/enterprise")
@RestController
public class EnterpriseController {

    @Autowired
    private IFileService iFileService;

    @Autowired
    private JWTUntil jwtUntil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private IEnterpiseService iEnterpiseService;

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private PositionRepository positionRepository;
    @GetMapping(value = "/get-certificate")
    public ResponseEntity getCertificate(HttpServletRequest httpServletRequest) throws IOException {
        UserEntity user = userRepository.findByUsername(jwtUntil.getUsernameFromRequest(httpServletRequest));
        return ResponseEntity.ok(iFileService.getCertificate(user.getEnterpriseId()));
    }

//    @GetMapping(value = "/get-file")
//    public ResponseEntity getFile(String idFile) throws IOException {
//        UserEntity user = userRepository.findByUsername(jwtUntil.getUsernameFromRequest(httpServletRequest));
//        return ResponseEntity.ok(iFileService.getCertificate(user.getEnterpriseId()));
//    }

    @PostMapping(value = "/send-certificate")
    public ResponseEntity sendCertificate(@RequestBody FileEntity fileEntity,HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(iEnterpiseService.sendCertificate(fileEntity,httpServletRequest));
    }

    @GetMapping(value = "/get-status")
    public ResponseEntity getStatus(HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(iEnterpiseService.getStatus(httpServletRequest));
    }

    @PostMapping(value = "/add-campaign")
    public ResponseEntity addCampaign(@RequestBody CampaignDTO campaignDTO,HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(iEnterpiseService.addCampaign(campaignDTO,httpServletRequest));
    }

    @GetMapping(value = "/get-list-campaign")
    public ResponseEntity getListCampaign(
            @RequestParam(defaultValue = DefautlConstants.PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = DefautlConstants.PAGE_NO) int pageNumber,
            @RequestParam(defaultValue = "") String search,
            HttpServletRequest httpServletRequest
    ){
        return ResponseEntity.ok(iEnterpiseService.getListCampaign(search,pageSize,pageNumber,httpServletRequest));
    }

    @PostMapping(value = "/add-new-post")
    public ResponseEntity addPost(
            @RequestBody PostDTO postDTO
            ){
        return ResponseEntity.ok(iEnterpiseService.addPost(postDTO));
    }

    @GetMapping(value = "/get-info-enterprise")
    public ResponseEntity getInfoEnterpise(HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(iEnterpiseService.getEnterpriseByHttpRequest(httpServletRequest));
    }

    @PutMapping(value = "/update-info-enterprise")
    public ResponseEntity updateInfoEnterprise(@RequestBody EnterpriseDTO enterpriseDTO,HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(iEnterpiseService.updateEnterprise(enterpriseDTO,httpServletRequest));
    }

    @GetMapping(value = "/get-list-post")
    public ResponseEntity getListPost(
            @RequestParam(defaultValue = DefautlConstants.PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = DefautlConstants.PAGE_NO) int pageNumber,
            @RequestParam(defaultValue = "") String search,
            HttpServletRequest httpServletRequest
    ){
        return ResponseEntity.ok(iEnterpiseService.getListPost(pageNumber,pageSize,httpServletRequest,search));
    }

    @GetMapping(value = "/get-all-field")
    public ResponseEntity getAllField(){
        return ResponseEntity.ok(fieldRepository.findAll());
    }

    @GetMapping(value = "/get-all-position")
    public ResponseEntity getAllPosition(){
        return ResponseEntity.ok(positionRepository.findAll());
    }

}
