import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { courseService } from '../../services/courseService';
import GuestCheckoutModal from '../../components/GuestCheckoutModal';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    courseService.getAllCourses().then(res => setCourses(Array.isArray(res.data) ? res.data : [])).catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-violet-600/20 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
              Over 50,000+ students joined
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
              Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Potential</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Master the skills of the future with our premium courses. Learn from industry experts and take your career to the next level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/courses" className="px-8 py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2">
                Explore Courses <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/dashboard" className="px-8 py-4 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-2">
                <Play className="h-5 w-5" /> Watch Demo
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative hidden md:block">
             {/* Abstract Code/Learning Illustration */}
             <div className="aspect-square rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl absolute inset-0"></div>
             <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" alt="Students learning" className="relative rounded-2xl shadow-2xl border border-white/10 object-cover aspect-video w-full" />
             <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex items-center gap-4">
               <div className="bg-indigo-100 p-3 rounded-full text-indigo-600"><BookOpen className="h-6 w-6" /></div>
               <div>
                 <div className="text-2xl font-black text-slate-900">200+</div>
                 <div className="text-sm font-medium text-slate-500">Premium Courses</div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Trending Now</h2>
              <p className="text-slate-500 text-lg">Top-rated courses handpicked for you.</p>
            </div>
            <Link to="/courses" className="text-indigo-600 font-semibold hover:text-indigo-700 hidden sm:flex items-center gap-1 group">
              View all <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 3).map(course => (
              <div onClick={() => setSelectedCourse(course)} key={course.id} className="cursor-pointer group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {course.categoryName}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">by <span className="font-medium text-slate-700">{course.instructorName}</span></p>
                  
                  <div className="flex items-center gap-4 mt-auto mb-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">4.8</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>12h 30m</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-2xl font-black text-slate-900">${course.price}</span>
                    <span className="text-indigo-600 font-semibold flex items-center gap-1">
                      Buy Now <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {courses.length === 0 && (
             <div className="text-center py-12 text-slate-500">Loading featured courses...</div>
          )}
        </div>
      </section>

      {selectedCourse && (
        <GuestCheckoutModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
};

export default HomePage;
