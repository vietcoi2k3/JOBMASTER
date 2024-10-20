package com.example.jobmaster.controller;

import com.example.jobmaster.entity.FieldEntity;
import com.example.jobmaster.entity.PositionEntity;
import com.example.jobmaster.entity.PostEnum;
import com.example.jobmaster.enumration.Time;
import com.example.jobmaster.repository.FieldRepository;
import com.example.jobmaster.repository.PositionRepository;
import com.example.jobmaster.service.IAdminService;
import com.example.jobmaster.until.constants.DefautlConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping(value = "/admin")
@RestController
public class AdminController {

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private IAdminService iAdminService;

    @Autowired
    private FieldRepository fieldRepository;
    @RequestMapping(value = "/add-position",method = RequestMethod.POST)
    public ResponseEntity addPosition(@RequestBody PositionEntity positionEntity){
        return ResponseEntity.ok(positionRepository.save(positionEntity));
    }

    @RequestMapping(value = "/add-field",method = RequestMethod.POST)
    public ResponseEntity addField(@RequestBody FieldEntity fieldEntity){
        if (fieldRepository.existsByCode(fieldEntity.getCode())){
            return ResponseEntity.badRequest().body("CODE EXITS");
        }
       return ResponseEntity.ok(fieldRepository.save(fieldEntity));
    }

    @RequestMapping(value = "/get-list-field",method = RequestMethod.GET)
    public ResponseEntity getListField(
            @RequestParam(required = false) String code,
            @RequestParam(defaultValue = "") String name
    ){
        return ResponseEntity.ok(fieldRepository.findByCodeAndName(code,name));
    };

    @RequestMapping(value = "/get-list-position",method = RequestMethod.GET)
    public ResponseEntity getListPosition(
            @RequestParam(required = false) String code,
            @RequestParam(defaultValue = "") String name
    ){
        return ResponseEntity.ok(positionRepository.findByCodeAndName(code,name));
    };

    @RequestMapping(value = "/delete-field/{id}",method = RequestMethod.DELETE)
    public ResponseEntity deleteField(@PathVariable String id){fieldRepository.deleteById(id);
        return ResponseEntity.ok("oke");
    }

    @RequestMapping(value = "/delete-position/{id}",method = RequestMethod.GET)
    public ResponseEntity deletePosition(@PathVariable String id){positionRepository.deleteById(id);
        return ResponseEntity.ok("oke");
    }

    @RequestMapping(value = "/get-list-account-candidate",method = RequestMethod.GET)
    public ResponseEntity getListAccountCandidate(
            @RequestParam(defaultValue = DefautlConstants.PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = DefautlConstants.PAGE_NO) int pageNumber
    ){
        return ResponseEntity.ok(iAdminService.getListCandidate(pageSize,pageNumber));
    }

    @RequestMapping(value = "/get-list-account-admin",method = RequestMethod.GET)
    public ResponseEntity getListAccountAdmin(
            @RequestParam(defaultValue = DefautlConstants.PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = DefautlConstants.PAGE_NO) int pageNumber
    ){
        return ResponseEntity.ok(iAdminService.getListAdmin(pageSize,pageNumber));
    }
    @RequestMapping(value = "/get-list-certificate",method = RequestMethod.GET)
    public ResponseEntity getListCertificate(
            @RequestParam(defaultValue = DefautlConstants.PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = DefautlConstants.PAGE_NO) int pageNumber
    ){
        return ResponseEntity.ok(iAdminService.getListCertificate(pageSize,pageNumber));
    }

    @RequestMapping(value = "/get-list-campaign",method = RequestMethod.GET)
    public ResponseEntity getListCampaign(
            @RequestParam(defaultValue = DefautlConstants.PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = DefautlConstants.PAGE_NO) int pageNumber,
                  @RequestParam(defaultValue = "") String search
    ){
        return ResponseEntity.ok(iAdminService.getListCampaign(pageSize,pageNumber,search));
    }

    @RequestMapping(value = "/get-list-post",method = RequestMethod.GET)
    public ResponseEntity getListPost(
            @RequestParam(defaultValue = DefautlConstants.PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = DefautlConstants.PAGE_NO) int pageNumber
    ){
        return ResponseEntity.ok(iAdminService.getListPost(pageNumber,pageSize));
    }

    @RequestMapping(value = "/get-detail-post/{id}",method = RequestMethod.GET)
    public ResponseEntity getDetailPost(
  @PathVariable String id
    ){
        return ResponseEntity.ok(iAdminService.getDetailPost(id));
    }
    @RequestMapping(value = "/get-list-package-admin",method = RequestMethod.GET)
    public ResponseEntity getListPackageAdmin(@RequestParam Time time){
        return ResponseEntity.ok(iAdminService.getListPackageAdmin(time));
    }

    @RequestMapping(value = "/update-status")
    public ResponseEntity updateStatusPost(@RequestParam PostEnum status,
    @RequestParam String id){
        return ResponseEntity.ok(iAdminService.updateStatusPost(id,status));
    }
}
