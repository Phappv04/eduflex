package com.eduflex.api.repository;
import com.eduflex.api.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
    List<Enrollment> findByUserIdOrderByEnrolledAtDesc(Integer userId);
    Optional<Enrollment> findByUserIdAndCourseId(Integer userId, Integer courseId);
    boolean existsByUserIdAndCourseId(Integer userId, Integer courseId);
}
