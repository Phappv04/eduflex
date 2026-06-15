package com.eduflex.api.service.impl;

import com.eduflex.api.dto.AuthRequest;
import com.eduflex.api.dto.AuthResponse;
import com.eduflex.api.dto.RegisterRequest;
import com.eduflex.api.model.Role;
import com.eduflex.api.model.User;
import com.eduflex.api.repository.RoleRepository;
import com.eduflex.api.repository.UserRepository;
import com.eduflex.api.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthServiceImpl {

    private final UserRepository repository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthServiceImpl(UserRepository repository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        if(repository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Role userRole = roleRepository.findByName("STUDENT")
                .orElseGet(() -> {
                    Role newRole = new Role("STUDENT");
                    return roleRepository.save(newRole);
                });

        User user = new User(request.getEmail(), passwordEncoder.encode(request.getPassword()), request.getFullName(), Set.of(userRole));
        repository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken, user.getEmail(), user.getFullName(), "STUDENT");
    }

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        
        String roleStr = user.getRoles().stream().findFirst().map(Role::getName).orElse("STUDENT");

        return new AuthResponse(jwtToken, user.getEmail(), user.getFullName(), roleStr);
    }
}
