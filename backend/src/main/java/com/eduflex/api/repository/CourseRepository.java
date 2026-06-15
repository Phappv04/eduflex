package com.eduflex.api.repository;
import com.eduflex.api.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    List<Course> findByStatus(String status);
    Optional<Course> findBySlug(String slug);
}
