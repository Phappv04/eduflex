package com.eduflex.api.repository;
import com.eduflex.api.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Integer> {
    List<Lesson> findByCourseIdOrderByOrderIndexAsc(Integer courseId);
}
