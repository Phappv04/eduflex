package com.eduflex.api.config;

import com.eduflex.api.model.Category;
import com.eduflex.api.model.Course;
import com.eduflex.api.model.Lesson;
import com.eduflex.api.model.Role;
import com.eduflex.api.model.User;
import com.eduflex.api.repository.CategoryRepository;
import com.eduflex.api.repository.CourseRepository;
import com.eduflex.api.repository.LessonRepository;
import com.eduflex.api.repository.RoleRepository;
import com.eduflex.api.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.Set;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository,
                                   RoleRepository roleRepository,
                                   CategoryRepository categoryRepository,
                                   CourseRepository courseRepository,
                                   LessonRepository lessonRepository,
                                   PasswordEncoder passwordEncoder) {
        return args -> {
            if (roleRepository.count() == 0) {
                Role adminRole = roleRepository.save(new Role("ADMIN"));
                Role instructorRole = roleRepository.save(new Role("INSTRUCTOR"));
                Role studentRole = roleRepository.save(new Role("STUDENT"));

                User admin = new User("admin@eduflex.com", passwordEncoder.encode("admin123"), "EduFlex Admin", Set.of(adminRole, instructorRole));
                userRepository.save(admin);

                Category programming = categoryRepository.save(new Category("Programming", "programming", "Learn to code"));
                Category design = categoryRepository.save(new Category("Design", "design", "Master UI/UX"));

                Course reactCourse = new Course(
                    "React.js & Next.js Masterclass", 
                    "react-masterclass", 
                    "The ultimate course to master React and Next.js from scratch.",
                    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
                    new BigDecimal("49.99"),
                    "APPROVED",
                    admin,
                    programming
                );
                courseRepository.save(reactCourse);

                Course javaCourse = new Course(
                    "Spring Boot 3 Microservices", 
                    "spring-boot-microservices", 
                    "Build scalable microservices with Java 17 and Spring Boot 3.",
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
                    new BigDecimal("59.99"),
                    "APPROVED",
                    admin,
                    programming
                );
                courseRepository.save(javaCourse);

                Course figmaCourse = new Course(
                    "Figma UI/UX Design Pro", 
                    "figma-ui-ux", 
                    "Learn how to design beautiful interfaces using Figma.",
                    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
                    new BigDecimal("39.99"),
                    "APPROVED",
                    admin,
                    design
                );
                courseRepository.save(figmaCourse);

                lessonRepository.save(new Lesson(reactCourse, "Introduction to React", "What is React?", "https://www.youtube.com/embed/bMknfKXIFA8", 600, 1, true));
                lessonRepository.save(new Lesson(reactCourse, "Components and Props", "Understanding components", "https://www.youtube.com/embed/bMknfKXIFA8", 900, 2, false));
            }
        };
    }
}
