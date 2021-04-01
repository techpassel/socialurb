package com.tp.socialurb.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @GetMapping("/")
    public ResponseEntity<?> testMethod(){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Admin Route Working");
    }
}
