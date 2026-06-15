package com.eduflex.api.dto;
public class LessonLearningResponse {
    private Integer id;
    private String title;
    private String description;
    private String videoUrl;
    private Integer duration;
    private Integer orderIndex;
    
    public LessonLearningResponse(Integer id, String title, String description, String videoUrl, Integer duration, Integer orderIndex) {
        this.id = id; this.title = title; this.description = description; this.videoUrl = videoUrl; this.duration = duration; this.orderIndex = orderIndex;
    }
    public Integer getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getVideoUrl() { return videoUrl; }
    public Integer getDuration() { return duration; }
    public Integer getOrderIndex() { return orderIndex; }
}
