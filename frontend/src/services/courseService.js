import axiosClient from './axiosClient';

export const courseService = {
  getAllCourses: () => {
    return axiosClient.get('/public/courses');
  },
  getCourseDetail: (slug) => {
    return axiosClient.get(`/public/courses/${slug}`);
  },
  guestCheckout: (data) => {
    return axiosClient.post(`/public/checkout`, data);
  }
};
