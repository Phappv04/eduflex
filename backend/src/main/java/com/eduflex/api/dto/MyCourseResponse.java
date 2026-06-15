package com.eduflex.api.dto;
import java.math.BigDecimal;
public class MyCourseResponse {
    private Integer courseId;
    private String title;
    private String slug;
    private String thumbnail;
    private String instructorName;
    private BigDecimal progressPercent;
    
    public MyCourseResponse(Integer courseId, String title, String slug, String thumbnail, String instructorName, BigDecimal progressPercent) {
        this.courseId = courseId; this.title = title; this.slug = slug; this.thumbnail = thumbnail; this.instructorName = instructorName; this.progressPercent = progressPercent;
    }
    public Integer getCourseId() { return courseId; }
    public String getTitle() { return title; }
    public String getSlug() { return slug; }
    public String getThumbnail() { return thumbnail; }
    public String getInstructorName() { return instructorName; }
    public BigDecimal getProgressPercent() { return progressPercent; }
}
