import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { BookOpen, User, LogOut, LogIn } from 'lucide-react';

const MainLayout = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">EduFlex</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/courses" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Courses</Link>
              <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">About Us</Link>
            </nav>
            <div className="flex items-center gap-4">
              {token ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">{user?.fullName || 'My Account'}</span>
                  </div>
                  <button onClick={() => { logout(); navigate('/login'); }} className="text-slate-500 hover:text-red-500 transition-colors">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors hidden sm:block">Log in</Link>
                  <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    <span>Sign up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-indigo-400" />
              <span className="text-xl font-bold text-white">EduFlex</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">Premium e-learning platform to master the most demanded skills in programming, design, and business.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses" className="hover:text-white transition-colors">Browse Courses</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Instructors</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
          &copy; {new Date().getFullYear()} EduFlex. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
