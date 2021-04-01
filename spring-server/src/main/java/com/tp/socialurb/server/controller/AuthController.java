package com.tp.socialurb.server.controller;

import com.tp.socialurb.server.domain.dto.LoginRequest;
import com.tp.socialurb.server.domain.mapper.UserViewMapper;
import com.tp.socialurb.server.model.User;
import com.tp.socialurb.server.model.spring_security.AuthUserDetails;
import com.tp.socialurb.server.repository.UserRepo;
import com.tp.socialurb.server.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    UserRepo userRepo;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtil jwtTokenUtil;
    @Autowired
    UserViewMapper userViewMapper;

    @PostMapping("/user")
    public ResponseEntity<?> generateUser(){
        try {
            User u = new User("Aman", "Saurabh", "aman@gmail.com", "7320865821", "123456");
            u.setPassword(bCryptPasswordEncoder.encode(u.getPassword()));
            userRepo.save(u);
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        } catch (DuplicateKeyException e) {
            String error = (e.getMessage().contains("email dup key")?"Email":"Phone") + " is already registered.";
            return new ResponseEntity<>(error, HttpStatus.CONFLICT);
        }  catch (Exception e){
            return new ResponseEntity<>("Some error occurred.Please try again.", HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PostMapping("/admin")
    public ResponseEntity<?> generateAdmin(){
        try {
            User u = new User("Manish", "Kumar", "admin@gmail.com", "9123416069", "123456");
            u.setPassword(bCryptPasswordEncoder.encode(u.getPassword()));
            u.setRole("ADMIN");
            userRepo.save(u);
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        } catch (DuplicateKeyException e) {
            String error = (e.getMessage().contains("email dup key")?"Email":"Phone") + " is already registered.";
            return new ResponseEntity<>(error, HttpStatus.CONFLICT);
        }  catch (Exception e){
            return new ResponseEntity<>("Some error occurred.Please try again.", HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest request) {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(), request.getPassword()
                            )
                    );
            User user = ((AuthUserDetails) authenticate.getPrincipal()).getUser();
            String token = jwtTokenUtil.generateAccessToken(user);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.AUTHORIZATION, token);
            return ResponseEntity.status(HttpStatus.OK).headers(headers).body(userViewMapper.toUserView(user));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
        }
    }
}
