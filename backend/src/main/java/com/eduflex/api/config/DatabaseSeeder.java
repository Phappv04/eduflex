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

                Category programming = categoryRepository.save(new Category("Lập Trình", "programming", "Học lập trình thực chiến"));

                Course cppCourse = new Course(
                    "Lập Trình C++ Từ Cơ Bản Đến Nâng Cao", 
                    "lap-trinh-cpp", 
                    "Khóa học C++ toàn diện nhất từ 28tech, cung cấp nền tảng tư duy lập trình vững chắc.",
                    "https://images.unsplash.com/photo-1619410283995-43d9134e7656?q=80&w=800&auto=format&fit=crop",
                    new BigDecimal("49.99"),
                    "APPROVED",
                    admin,
                    programming
                );
                courseRepository.save(cppCourse);

                Course dsaCourse = new Course(
                    "Cấu Trúc Dữ Liệu Và Thuật Toán", 
                    "dsa-28tech", 
                    "Bí kíp cày cuốc Thuật toán, vượt qua mọi bài phỏng vấn tại các Big Tech.",
                    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop",
                    new BigDecimal("59.99"),
                    "APPROVED",
                    admin,
                    programming
                );
                courseRepository.save(dsaCourse);

                Course javaCourse = new Course(
                    "Lập Trình Java Tiêu Chuẩn", 
                    "lap-trinh-java", 
                    "Làm chủ Java Core và Lập trình hướng đối tượng OOP cực sâu.",
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
                    new BigDecimal("39.99"),
                    "APPROVED",
                    admin,
                    programming
                );
                courseRepository.save(javaCourse);

                Course pythonCourse = new Course(
                    "Lập Trình Python Thực Chiến", 
                    "python-thuc-chien", 
                    "Học Python nhanh gọn, ứng dụng ngay vào AI và Data.",
                    "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?q=80&w=800&auto=format&fit=crop",
                    new BigDecimal("29.99"),
                    "APPROVED",
                    admin,
                    programming
                );
                courseRepository.save(pythonCourse);

                // Add sample lessons for C++ course
                lessonRepository.save(new Lesson(cppCourse, "Bài 1: Cài đặt môi trường Dev C++", "Hướng dẫn cài đặt Dev C++ và chạy chương trình đầu tiên.", "https://www.youtube.com/embed/bMknfKXIFA8", 600, 1, true));
                lessonRepository.save(new Lesson(cppCourse, "Bài 2: Kiểu dữ liệu và Biến", "Tìm hiểu về các kiểu dữ liệu cơ bản trong C++.", "https://www.youtube.com/embed/bMknfKXIFA8", 900, 2, false));
                lessonRepository.save(new Lesson(cppCourse, "Bài 3: Cấu trúc rẽ nhánh If Else", "Học cách dùng câu lệnh điều kiện.", "https://www.youtube.com/embed/bMknfKXIFA8", 1200, 3, false));

                // Add sample lessons for DSA course
                lessonRepository.save(new Lesson(dsaCourse, "Bài 1: Giới thiệu Độ phức tạp Thuật toán", "Độ phức tạp O(N), O(logN) là gì?", "https://www.youtube.com/embed/bMknfKXIFA8", 1500, 1, true));
                lessonRepository.save(new Lesson(dsaCourse, "Bài 2: Mảng 1 chiều", "Lý thuyết và bài tập mảng 1 chiều", "https://www.youtube.com/embed/bMknfKXIFA8", 2000, 2, false));
            }
        };
    }
}
