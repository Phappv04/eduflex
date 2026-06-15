package com.eduflex.api.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String thumbnail;

    @Column(nullable = false)
    private BigDecimal price = BigDecimal.ZERO;

    @Column(length = 50)
    private String status = "PENDING";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id")
    private User instructor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private Set<Lesson> lessons;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Course() {}

    public Course(String title, String slug, String description, String thumbnail, BigDecimal price, String status, User instructor, Category category) {
        this.title = title; this.slug = slug; this.description = description; this.thumbnail = thumbnail; this.price = price; this.status = status; this.instructor = instructor; this.category = category;
    }

    @PrePersist
    protected void onCreate() { this.createdAt = LocalDateTime.now(); this.updatedAt = LocalDateTime.now(); }

    @PreUpdate
    protected void onUpdate() { this.updatedAt = LocalDateTime.now(); }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getThumbnail() { return thumbnail; }
    public void setThumbnail(String thumbnail) { this.thumbnail = thumbnail; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public User getInstructor() { return instructor; }
    public void setInstructor(User instructor) { this.instructor = instructor; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    public Set<Lesson> getLessons() { return lessons; }
    public void setLessons(Set<Lesson> lessons) { this.lessons = lessons; }
}
