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

    @RequestMapping(value = "/delete-position/{id}",method = RequestMethod.DELETE)
    public ResponseEntity deletePosition(@PathVariable String id){positionRepository.deleteById(id);
        return ResponseEntity.ok("oke");
    }
}
