package com.eduflex.api.dto;
import java.math.BigDecimal;

public class CourseResponse {
    private Integer id;
    private String title;
    private String slug;
    private String thumbnail;
    private BigDecimal price;
    private String instructorName;
    private String categoryName;

    public CourseResponse() {}
    public CourseResponse(Integer id, String title, String slug, String thumbnail, BigDecimal price, String instructorName, String categoryName) {
        this.id = id; this.title = title; this.slug = slug; this.thumbnail = thumbnail; this.price = price; this.instructorName = instructorName; this.categoryName = categoryName;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getThumbnail() { return thumbnail; }
    public void setThumbnail(String thumbnail) { this.thumbnail = thumbnail; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getInstructorName() { return instructorName; }
    public void setInstructorName(String instructorName) { this.instructorName = instructorName; }
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
}
