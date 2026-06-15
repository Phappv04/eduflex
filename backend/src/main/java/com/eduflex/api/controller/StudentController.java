package com.eduflex.api.controller;
import com.eduflex.api.dto.EnrollmentRequest;
import com.eduflex.api.dto.LessonLearningResponse;
import com.eduflex.api.dto.MyCourseResponse;
import com.eduflex.api.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    private final StudentService studentService;
    public StudentController(StudentService studentService) { this.studentService = studentService; }

    @PostMapping("/enroll")
    public ResponseEntity<?> enroll(@RequestBody EnrollmentRequest request, Authentication auth) {
        try {
            studentService.enrollCourse(auth.getName(), request.getCourseId());
            return ResponseEntity.ok(Map.of("message", "Enrolled successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/my-courses")
    public ResponseEntity<List<MyCourseResponse>> getMyCourses(Authentication auth) {
        return ResponseEntity.ok(studentService.getMyCourses(auth.getName()));
    }

    @GetMapping("/check-enrollment/{slug}")
    public ResponseEntity<?> checkEnrollment(@PathVariable String slug, Authentication auth) {
        try {
            return ResponseEntity.ok(Map.of("enrolled", studentService.isEnrolled(auth.getName(), slug)));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("enrolled", false));
        }
    }

    @GetMapping("/courses/{slug}/learn")
    public ResponseEntity<List<LessonLearningResponse>> getLearningLessons(@PathVariable String slug, Authentication auth) {
        try {
            return ResponseEntity.ok(studentService.getCourseLessons(auth.getName(), slug));
        } catch (Exception e) {
            return ResponseEntity.status(403).build();
        }
    }
}
