package com.eduflex.api.controller;

import com.eduflex.api.dto.CourseDetailResponse;
import com.eduflex.api.dto.CourseResponse;
import com.eduflex.api.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/courses")
public class PublicCourseController {

    private final CourseService courseService;

    public PublicCourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public ResponseEntity<List<CourseResponse>> getCourses() {
        return ResponseEntity.ok(courseService.getAllActiveCourses());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<CourseDetailResponse> getCourseDetail(@PathVariable String slug) {
        return ResponseEntity.ok(courseService.getCourseBySlug(slug));
    }

}
