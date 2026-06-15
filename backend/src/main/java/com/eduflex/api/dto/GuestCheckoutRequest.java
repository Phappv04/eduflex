package com.eduflex.api.dto;

public class GuestCheckoutRequest {
    private String fullName;
    private String email;
    private Integer courseId;

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Integer getCourseId() { return courseId; }
    public void setCourseId(Integer courseId) { this.courseId = courseId; }
}
