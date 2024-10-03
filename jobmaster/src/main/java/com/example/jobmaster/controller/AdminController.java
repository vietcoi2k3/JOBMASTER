package com.example.jobmaster.controller;

import com.example.jobmaster.entity.FieldEntity;
import com.example.jobmaster.entity.PositionEntity;
import com.example.jobmaster.repository.FieldRepository;
import com.example.jobmaster.repository.PositionRepository;
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
    private FieldRepository fieldRepository;
    @RequestMapping(value = "/add-position",method = RequestMethod.POST)
    public ResponseEntity addPosition(@RequestBody PositionEntity positionEntity){
        return ResponseEntity.ok(positionRepository.save(positionEntity));
    }

    @RequestMapping(value = "/add-field",method = RequestMethod.POST)
    public ResponseEntity addField(@RequestBody FieldEntity fieldEntity){
       return ResponseEntity.ok(fieldRepository.save(fieldEntity));
    }


}
