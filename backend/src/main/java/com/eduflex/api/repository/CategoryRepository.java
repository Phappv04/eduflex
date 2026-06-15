package com.eduflex.api.repository;
import com.eduflex.api.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findBySlug(String slug);
}
