package com.eduflex.api.service;

import com.eduflex.api.dto.CourseDetailResponse;
import com.eduflex.api.dto.CourseResponse;
import com.eduflex.api.model.Course;
import com.eduflex.api.repository.CourseRepository;
import com.eduflex.api.repository.LessonRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;

    public CourseService(CourseRepository courseRepository, LessonRepository lessonRepository) {
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
    }

    public List<CourseResponse> getAllActiveCourses() {
        return courseRepository.findByStatus("APPROVED").stream().map(course -> 
            new CourseResponse(
                course.getId(),
                course.getTitle(),
                course.getSlug(),
                course.getThumbnail(),
                course.getPrice(),
                course.getInstructor() != null ? course.getInstructor().getFullName() : "EduFlex",
                course.getCategory() != null ? course.getCategory().getName() : "General"
            )
        ).collect(Collectors.toList());
    }

    public CourseDetailResponse getCourseBySlug(String slug) {
        Course course = courseRepository.findBySlug(slug).orElseThrow(() -> new RuntimeException("Course not found"));
        
        List<CourseDetailResponse.LessonDto> lessons = lessonRepository.findByCourseIdOrderByOrderIndexAsc(course.getId())
            .stream()
            .map(l -> new CourseDetailResponse.LessonDto(l.getTitle(), l.getDuration(), l.getIsPreview()))
            .collect(Collectors.toList());

        return new CourseDetailResponse(
            course.getId(),
            course.getTitle(),
            course.getDescription(),
            course.getThumbnail(),
            course.getPrice(),
            course.getInstructor() != null ? course.getInstructor().getFullName() : "EduFlex",
            lessons
        );
    }

}
