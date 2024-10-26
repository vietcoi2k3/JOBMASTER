package com.example.jobmaster.controller;

import com.example.jobmaster.dto.CampaignDTO;
import com.example.jobmaster.dto.EnterpriseDTO;
import com.example.jobmaster.dto.PostDTO;
import com.example.jobmaster.dto.Request.ActivatePackageRequest;
import com.example.jobmaster.entity.CVEntity;
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
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;



/**
 * Class: EnterpriseController
 * Author: ACER
 * Date: 9/2/2024
 * Description: [Your description here]
 */

@RequestMapping(value = "/enterprise")
@RestController
@SecurityRequirement(name = "bearerAuth")
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
//    private final String UPLOAD_DIR = "C:/uploads/";
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

    @PutMapping("/update-status-campaign/{id}")
    public ResponseEntity updateStatusCampaign(
            @PathVariable(value = "id") String id
    ){
        iEnterpiseService.updateStatusCampaign(id);
        return ResponseEntity.ok().body("SUCCESSFULLY");
    }

    @PutMapping("/update-campaign/{id}")
    public ResponseEntity updateCampaign(
            @PathVariable(value = "id") String id,
            @RequestBody CampaignDTO campaignDTO
    ){
        iEnterpiseService.updateCampaign(id,campaignDTO);
        return ResponseEntity.ok().body("SUCCESSFULLY");
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

    @GetMapping(value = "/get-list-campaign-post")
    public ResponseEntity getListCampaignForPost(

            HttpServletRequest httpServletRequest
    ){
        return ResponseEntity.ok(iEnterpiseService.getAllCampaign(httpServletRequest));
    }

    @PostMapping(value = "/add-new-post")
    public ResponseEntity addPost(
            @RequestBody PostDTO postDTO,
            @RequestHeader("Authorization") String token
            ){
        return ResponseEntity.ok(iEnterpiseService.addPost(token,postDTO));
    }
    @PutMapping("/update-post/{id}")
    public ResponseEntity updatePost(
            @PathVariable(value = "id") String id,
            @RequestBody PostDTO postDTO
    ){
        return ResponseEntity.ok().body(iEnterpiseService.updatePost(id,postDTO));
    }

    @PutMapping("/reset-post-status/{id}")
    public ResponseEntity resetPostStatus(@PathVariable(value = "id") String id){
        iEnterpiseService.resetPostStatus(id);
        return ResponseEntity.ok().body("OK");
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
            @RequestParam(value = "search",defaultValue = "") String search,
            @RequestParam(value = "status", required = false) String status,
            HttpServletRequest httpServletRequest
    ){
        return ResponseEntity.ok(iEnterpiseService.getListPost(pageNumber,pageSize,httpServletRequest,search,status));
    }

    @GetMapping(value = "/get-all-field")
    public ResponseEntity getAllField(){
        return ResponseEntity.ok(fieldRepository.findAll());
    }

    @GetMapping(value = "/get-all-position")
    public ResponseEntity getAllPosition(){
        return ResponseEntity.ok(positionRepository.findAll());
    }

    @GetMapping(value = "/get-post-detail/{id}")
    public ResponseEntity getDetailPost(@PathVariable String id){
        return ResponseEntity.ok(iEnterpiseService.getDetailPost(id));
    }

    @GetMapping(value = "/get-list-cv")
    public ResponseEntity getListCv(
            @RequestParam(defaultValue = DefautlConstants.PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = DefautlConstants.PAGE_NO) int pageNumber,
            @RequestParam(defaultValue = "") String postId,
            @RequestParam(value = "status",required = false) String status
    ){
        return ResponseEntity.ok(iEnterpiseService.getListCv(pageNumber,pageSize,postId, status));
    }

    @RequestMapping(value = "/get-detail-cv/{id}",method = RequestMethod.GET)
    public ResponseEntity getDetailCv(@PathVariable String id){
        return ResponseEntity.ok(iEnterpiseService.getDetailCv(id));
    }

    @RequestMapping(value = "/update-status-cv",method = RequestMethod.PUT)
    public ResponseEntity updateStatusCv(@RequestBody CVEntity cvEntity){
        return ResponseEntity.ok(iEnterpiseService.updateStatus(cvEntity));
    }

    @RequestMapping(value = "/get-list-package/{campaignId}",method = RequestMethod.GET)
    public ResponseEntity getListPackage(@PathVariable String campaignId){
        return ResponseEntity.ok(iEnterpiseService.getListPackage(campaignId));
    }

    @RequestMapping(value = "/activate-package",method = RequestMethod.POST)
    public ResponseEntity activatePackage(@RequestBody ActivatePackageRequest activatePackageRequest, HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(iEnterpiseService.activatePackage(activatePackageRequest,httpServletRequest));
    }

    @GetMapping("/get-all-package")
    public ResponseEntity getAllPackage(){
        return ResponseEntity.ok().body(iEnterpiseService.getAllPackage());
    }


    @RequestMapping(value = "/get-money-history",method = RequestMethod.GET)
    public ResponseEntity getMoneyHistory(
            @RequestParam(defaultValue = DefautlConstants.PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = DefautlConstants.PAGE_NO) int pageNumber,
            HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(iEnterpiseService.getHistoryMoney(pageSize,pageNumber,httpServletRequest));
    }

    @RequestMapping(value = "/get-package-by-campaign/{id}",method = RequestMethod.GET)
    public ResponseEntity getListPackageByCampaign(@PathVariable String id){
        return ResponseEntity.ok(iEnterpiseService.getListPackageByCampaign(id));
    }

    @GetMapping("/get-news-info")
    public ResponseEntity getNewsInfo(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok().body(iEnterpiseService.getNewsInfo(token));
    }
    @GetMapping("/get-news-chart")
    public ResponseEntity getNewsChart(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok().body(iEnterpiseService.getNewsChart(token));
    }

}
