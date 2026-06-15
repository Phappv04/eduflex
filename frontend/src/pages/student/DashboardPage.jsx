import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, BookOpen } from 'lucide-react';
import { studentService } from '../../services/studentService';
import { AuthContext } from '../../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentService.getMyCourses()
      .then(res => { setCourses(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Learning</h1>
        <p className="text-slate-600">Welcome back, {user?.fullName}! Continue your journey.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading your courses...</div>
      ) : courses.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center flex flex-col items-center">
          <BookOpen className="h-16 w-16 text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">No courses yet</h2>
          <p className="text-slate-500 mb-6">You haven't enrolled in any courses. Explore the catalog to start learning!</p>
          <Link to="/courses" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <Link to={`/learn/${course.slug}`} key={course.courseId} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="aspect-video relative overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <PlayCircle className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-slate-500 mb-6">by {course.instructorName}</p>
                <div className="mt-auto">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="font-medium text-indigo-600">{course.progressPercent}% Complete</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${course.progressPercent}%` }}></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
