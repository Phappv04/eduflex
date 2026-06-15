package com.eduflex.api.service;
import com.eduflex.api.dto.LessonLearningResponse;
import com.eduflex.api.dto.MyCourseResponse;
import com.eduflex.api.model.Course;
import com.eduflex.api.model.Enrollment;
import com.eduflex.api.model.User;
import com.eduflex.api.repository.CourseRepository;
import com.eduflex.api.repository.EnrollmentRepository;
import com.eduflex.api.repository.LessonRepository;
import com.eduflex.api.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;

    public StudentService(EnrollmentRepository enrollmentRepository, CourseRepository courseRepository, UserRepository userRepository, LessonRepository lessonRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.lessonRepository = lessonRepository;
    }

    public void enrollCourse(String email, Integer courseId) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
        if (enrollmentRepository.existsByUserIdAndCourseId(user.getId(), courseId)) {
            throw new RuntimeException("Already enrolled");
        }
        enrollmentRepository.save(new Enrollment(user, course));
    }

    public List<MyCourseResponse> getMyCourses(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return enrollmentRepository.findByUserIdOrderByEnrolledAtDesc(user.getId())
            .stream()
            .map(e -> new MyCourseResponse(
                e.getCourse().getId(),
                e.getCourse().getTitle(),
                e.getCourse().getSlug(),
                e.getCourse().getThumbnail(),
                e.getCourse().getInstructor() != null ? e.getCourse().getInstructor().getFullName() : "EduFlex",
                e.getProgressPercent()
            )).collect(Collectors.toList());
    }

    public boolean isEnrolled(String email, String slug) {
        if (email == null) return false;
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return false;
        Course course = courseRepository.findBySlug(slug).orElse(null);
        if (course == null) return false;
        return enrollmentRepository.existsByUserIdAndCourseId(user.getId(), course.getId());
    }

    public List<LessonLearningResponse> getCourseLessons(String email, String slug) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseRepository.findBySlug(slug).orElseThrow(() -> new RuntimeException("Course not found"));
        
        if (!enrollmentRepository.existsByUserIdAndCourseId(user.getId(), course.getId())) {
            throw new RuntimeException("Not enrolled in this course");
        }

        return lessonRepository.findByCourseIdOrderByOrderIndexAsc(course.getId())
            .stream()
            .map(l -> new LessonLearningResponse(l.getId(), l.getTitle(), l.getDescription(), l.getVideoUrl(), l.getDuration(), l.getOrderIndex()))
            .collect(Collectors.toList());
    }
}
