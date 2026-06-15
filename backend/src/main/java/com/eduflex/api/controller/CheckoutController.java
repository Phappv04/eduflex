package com.eduflex.api.controller;

import com.eduflex.api.dto.AuthResponse;
import com.eduflex.api.dto.GuestCheckoutRequest;
import com.eduflex.api.model.Course;
import com.eduflex.api.model.Enrollment;
import com.eduflex.api.model.Role;
import com.eduflex.api.model.User;
import com.eduflex.api.repository.CourseRepository;
import com.eduflex.api.repository.EnrollmentRepository;
import com.eduflex.api.repository.RoleRepository;
import com.eduflex.api.repository.UserRepository;
import com.eduflex.api.security.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/public/checkout")
public class CheckoutController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final JwtService jwtService;

    public CheckoutController(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, CourseRepository courseRepository, EnrollmentRepository enrollmentRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.jwtService = jwtService;
    }

    @PostMapping
    public ResponseEntity<AuthResponse> processGuestCheckout(@RequestBody GuestCheckoutRequest request) {
        try {
            User user = userRepository.findByEmail(request.getEmail()).orElse(null);
            if (user == null) {
                Role userRole = roleRepository.findByName("STUDENT")
                        .orElseGet(() -> roleRepository.save(new Role("STUDENT")));
                String randomPassword = UUID.randomUUID().toString();
                user = new User(request.getEmail(), passwordEncoder.encode(randomPassword), request.getFullName(), Set.of(userRole));
                user = userRepository.save(user);
            }

            Course course = courseRepository.findById(request.getCourseId())
                    .orElseThrow(() -> new RuntimeException("Course not found"));

            if (!enrollmentRepository.existsByUserIdAndCourseId(user.getId(), course.getId())) {
                enrollmentRepository.save(new Enrollment(user, course));
            }

            String jwtToken = jwtService.generateToken(user);
            return ResponseEntity.ok(new AuthResponse(jwtToken, user.getEmail(), user.getFullName(), "STUDENT"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
