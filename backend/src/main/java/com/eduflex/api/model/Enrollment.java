package com.eduflex.api.model;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "course_id"})})
public class Enrollment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    @Column(name = "progress_percent")
    private BigDecimal progressPercent = BigDecimal.ZERO;
    @Column(name = "enrolled_at", updatable = false)
    private LocalDateTime enrolledAt;

    public Enrollment() {}
    public Enrollment(User user, Course course) { this.user = user; this.course = course; }
    @PrePersist protected void onCreate() { this.enrolledAt = LocalDateTime.now(); }
    public Integer getId() { return id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public BigDecimal getProgressPercent() { return progressPercent; }
    public void setProgressPercent(BigDecimal progressPercent) { this.progressPercent = progressPercent; }
}
