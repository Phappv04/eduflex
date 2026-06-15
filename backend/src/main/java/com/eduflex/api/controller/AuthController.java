package com.eduflex.api.controller;

import com.eduflex.api.dto.AuthRequest;
import com.eduflex.api.dto.AuthResponse;
import com.eduflex.api.dto.RegisterRequest;
import com.eduflex.api.service.impl.AuthServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthServiceImpl service;
    public AuthController(AuthServiceImpl service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}
