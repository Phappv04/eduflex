package com.eduflex.api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lessons")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "video_url")
    private String videoUrl;

    private Integer duration = 0;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex = 0;

    @Column(name = "is_preview")
    private Boolean isPreview = false;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Lesson() {}
    public Lesson(Course course, String title, String description, String videoUrl, Integer duration, Integer orderIndex, Boolean isPreview) {
        this.course = course; this.title = title; this.description = description; this.videoUrl = videoUrl; this.duration = duration; this.orderIndex = orderIndex; this.isPreview = isPreview;
    }

    @PrePersist
    protected void onCreate() { this.createdAt = LocalDateTime.now(); this.updatedAt = LocalDateTime.now(); }

    @PreUpdate
    protected void onUpdate() { this.updatedAt = LocalDateTime.now(); }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }
    public Boolean getIsPreview() { return isPreview; }
    public void setIsPreview(Boolean isPreview) { this.isPreview = isPreview; }
}
