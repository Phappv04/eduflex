import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PlayCircle, Clock, Award, CheckCircle, Lock, X } from 'lucide-react';
import { courseService } from '../../services/courseService';
import { studentService } from '../../services/studentService';
import { AuthContext } from '../../contexts/AuthContext';

const CourseDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { token, login } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({ fullName: '', email: '' });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    courseService.getCourseDetail(slug)
      .then(res => { 
        setCourse(res.data); 
        if (token) {
          studentService.checkEnrollment(slug)
            .then(enrollRes => setIsEnrolled(enrollRes.data.enrolled))
            .catch(() => setIsEnrolled(false))
            .finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, [slug, token]);

  const handleGuestCheckout = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await courseService.guestCheckout({
        fullName: checkoutData.fullName,
        email: checkoutData.email,
        courseId: course.id
      });
      login(res.data.token);
      navigate(`/learn/${slug}`);
    } catch (err) {
      alert('Checkout failed. Please try again.');
      setProcessing(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading course details...</div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center text-slate-500">Course not found.</div>;

  return (
    <div className="bg-slate-50 pb-20">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white pt-12 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">{course.title}</h1>
            <p className="text-xl text-slate-300 mb-6">{course.description}</p>
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-400">
              <span className="flex items-center gap-2"><Award className="h-5 w-5 text-yellow-400" /> Bestseller</span>
              <span>Created by <span className="text-white underline">{course.instructorName}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-grow w-full lg:w-2/3 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Syllabus</h2>
              <div className="space-y-4">
                {course.previewLessons && course.previewLessons.map((lesson, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white transition-colors group cursor-pointer" onClick={() => { if(isEnrolled || lesson.isPreview) navigate(`/learn/${slug}`) }}>
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center justify-center h-10 w-10 rounded-full ${(lesson.isPreview || isEnrolled) ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-500'}`}>
                        {(lesson.isPreview || isEnrolled) ? <PlayCircle className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className={`font-semibold ${(lesson.isPreview || isEnrolled) ? 'text-slate-900' : 'text-slate-600'}`}>{lesson.title}</h4>
                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Clock className="h-3 w-3" /> {Math.floor(lesson.duration / 60)} mins</div>
                      </div>
                    </div>
                    {lesson.isPreview && !isEnrolled && <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Preview</span>}
                  </div>
                ))}
                {(!course.previewLessons || course.previewLessons.length === 0) && (
                  <div className="text-slate-500 text-center py-6">No lessons uploaded yet.</div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Floating Card */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden sticky top-24">
              <div className="aspect-video relative group cursor-pointer bg-slate-900">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="p-8">
                <div className="text-4xl font-black text-slate-900 mb-6">${course.price}</div>
                <button 
                  onClick={() => isEnrolled ? navigate(`/learn/${slug}`) : setShowCheckout(true)}
                  className={`w-full font-bold text-lg py-4 rounded-xl transition-colors mb-4 shadow-lg ${isEnrolled ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/30' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30'}`}
                >
                  {isEnrolled ? 'Go to Course' : 'Buy Now'}
                </button>
                <div className="text-center text-sm text-slate-500 mb-6">30-Day Money-Back Guarantee</div>
                
                <h4 className="font-bold text-slate-900 mb-4">This course includes:</h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-3"><PlayCircle className="h-4 w-4" /> 12 hours on-demand video</li>
                  <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4" /> Full lifetime access</li>
                  <li className="flex items-center gap-3"><Award className="h-4 w-4" /> Certificate of completion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button onClick={() => setShowCheckout(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Guest Checkout</h3>
            <p className="text-slate-500 mb-6">Enter your details to get instant access. No password required!</p>
            <form onSubmit={handleGuestCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input required type="text" value={checkoutData.fullName} onChange={e => setCheckoutData({...checkoutData, fullName: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input required type="email" value={checkoutData.email} onChange={e => setCheckoutData({...checkoutData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
              </div>
              <button disabled={processing} type="submit" className={`w-full py-3 rounded-lg font-bold text-white transition-colors mt-4 ${processing ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                {processing ? 'Processing...' : `Pay $${course.price} & Start Learning`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
