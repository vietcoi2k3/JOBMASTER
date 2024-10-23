package com.example.jobmaster.controller;

import com.example.jobmaster.dto.Request.ChangePasswordRequest;
import com.example.jobmaster.dto.UserDTO;
import com.example.jobmaster.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private final IUserService userService;

    @GetMapping("/get-user-by-token")
    public ResponseEntity<UserDTO> getUserByToken(
            @RequestHeader("Authorization") String token
    ){
        return ResponseEntity.ok().body(userService.getUserByToken(token));
    }

    @PutMapping("/update-user/{id}")
    public ResponseEntity<UserDTO> updateUser(
            @PathVariable(value = "id") String id,
            @RequestBody UserDTO userDTO
    ){
        return ResponseEntity.ok().body(userService.updateUser(id,userDTO));
    }
    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(
            @RequestHeader("Authorization") String token,
            @RequestBody ChangePasswordRequest changePasswordRequest
    ){
        userService.updatePassword(token,changePasswordRequest);
        return ResponseEntity.ok().body("SUCCESSFULLY");
    }


}
