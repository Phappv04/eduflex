package com.eduflex.api.dto;
import java.math.BigDecimal;
import java.util.List;

public class CourseDetailResponse {
    private Integer id;
    private String title;
    private String description;
    private String thumbnail;
    private BigDecimal price;
    private String instructorName;
    private List<LessonDto> previewLessons;

    public static class LessonDto {
        private String title;
        private Integer duration;
        private Boolean isPreview;
        public LessonDto(String title, Integer duration, Boolean isPreview) { this.title = title; this.duration = duration; this.isPreview = isPreview; }
        public String getTitle() { return title; }
        public Integer getDuration() { return duration; }
        public Boolean getIsPreview() { return isPreview; }
    }

    public CourseDetailResponse() {}

    public CourseDetailResponse(Integer id, String title, String description, String thumbnail, BigDecimal price, String instructorName, List<LessonDto> previewLessons) {
        this.id = id; this.title = title; this.description = description; this.thumbnail = thumbnail; this.price = price; this.instructorName = instructorName; this.previewLessons = previewLessons;
    }

    public Integer getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getThumbnail() { return thumbnail; }
    public BigDecimal getPrice() { return price; }
    public String getInstructorName() { return instructorName; }
    public List<LessonDto> getPreviewLessons() { return previewLessons; }
}
