import axiosClient from './axiosClient';

export const studentService = {
  enrollCourse: (courseId) => {
    return axiosClient.post('/student/enroll', { courseId });
  },
  getMyCourses: () => {
    return axiosClient.get('/student/my-courses');
  },
  checkEnrollment: (slug) => {
    return axiosClient.get(`/student/check-enrollment/${slug}`);
  },
  getLearningLessons: (slug) => {
    return axiosClient.get(`/student/courses/${slug}/learn`);
  }
};
