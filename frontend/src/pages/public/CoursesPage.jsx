import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock } from 'lucide-react';
import { courseService } from '../../services/courseService';
import GuestCheckoutModal from '../../components/GuestCheckoutModal';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    courseService.getAllCourses()
      .then(res => { setCourses(Array.isArray(res.data) ? res.data : []); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">All Courses</h1>
          <p className="text-slate-600">Explore our comprehensive catalog of high-quality courses.</p>
        </div>
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input 
            type="text" 
            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow shadow-sm hover:shadow-md" 
            placeholder="Search courses..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(course => (
          <div onClick={() => setSelectedCourse(course)} key={course.id} className="cursor-pointer group flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-indigo-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="aspect-video overflow-hidden relative">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="text-xs font-semibold text-indigo-600 mb-2 uppercase tracking-wider">{course.categoryName}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
              <p className="text-xs text-slate-500 mb-3">by {course.instructorName}</p>
              
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
                <span className="text-lg font-bold text-slate-900">${course.price}</span>
                <span className="ml-auto text-indigo-600 font-semibold">Buy Now</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
         <div className="text-center py-20">
           <div className="text-slate-400 mb-4 flex justify-center"><Search className="h-12 w-12" /></div>
           <h3 className="text-lg font-medium text-slate-900">No courses found</h3>
           <p className="text-slate-500">Try adjusting your search terms.</p>
         </div>
      )}

      {selectedCourse && (
        <GuestCheckoutModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
};

export default CoursesPage;
