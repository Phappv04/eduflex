import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PlayCircle, CheckCircle, ArrowLeft, Menu, X } from 'lucide-react';
import { studentService } from '../../services/studentService';

const LearningPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    studentService.getLearningLessons(slug)
      .then(res => {
        setLessons(res.data);
        if (res.data.length > 0) setCurrentLesson(res.data[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        navigate('/dashboard'); // Not enrolled or error
      });
  }, [slug, navigate]);

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-500">Loading learning environment...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-950 border-b border-slate-800 h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link to={`/courses/${slug}`} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" /> Back to Course
          </Link>
          <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
          <h1 className="font-bold text-lg hidden sm:block truncate max-w-md">{currentLesson?.title || 'Learning'}</h1>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white lg:hidden">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex relative overflow-hidden">
        {/* Video Area */}
        <div className={`flex-grow flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:mr-80' : ''}`}>
          <div className="w-full bg-black aspect-video relative flex items-center justify-center">
            {currentLesson?.videoUrl ? (
              <iframe 
                src={currentLesson.videoUrl} 
                className="absolute inset-0 w-full h-full" 
                allowFullScreen
                title={currentLesson.title}
              ></iframe>
            ) : (
              <div className="text-slate-500 flex flex-col items-center">
                <PlayCircle className="h-16 w-16 mb-4 opacity-50" />
                <p>Video not available for this lesson.</p>
              </div>
            )}
          </div>
          <div className="p-8 max-w-4xl mx-auto w-full flex-grow overflow-y-auto">
            <h2 className="text-3xl font-bold mb-4">{currentLesson?.title}</h2>
            <div className="prose prose-invert max-w-none text-slate-300">
              <p>{currentLesson?.description || 'No description provided for this lesson.'}</p>
            </div>
          </div>
        </div>

        {/* Sidebar Syllabus */}
        <div className={`absolute top-0 right-0 bottom-0 w-80 bg-slate-950 border-l border-slate-800 flex flex-col transition-transform duration-300 z-10 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 border-b border-slate-800 font-bold text-lg flex items-center justify-between">
            Course Content
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
          </div>
          <div className="overflow-y-auto flex-grow p-2">
            {lessons.map((lesson, idx) => (
              <button 
                key={lesson.id} 
                onClick={() => setCurrentLesson(lesson)}
                className={`w-full text-left p-3 rounded-lg flex gap-3 mb-1 transition-colors ${currentLesson?.id === lesson.id ? 'bg-indigo-600/20 text-indigo-400' : 'hover:bg-slate-800 text-slate-400'}`}
              >
                <div className="mt-0.5">
                  <CheckCircle className={`h-4 w-4 ${currentLesson?.id === lesson.id ? 'text-indigo-400' : 'text-slate-600'}`} />
                </div>
                <div>
                  <div className={`text-sm font-medium line-clamp-2 ${currentLesson?.id === lesson.id ? 'text-white' : 'text-slate-300'}`}>
                    {idx + 1}. {lesson.title}
                  </div>
                  <div className="text-xs mt-1 opacity-70">{Math.floor(lesson.duration / 60)} mins</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
