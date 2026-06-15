import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/public/HomePage';
import CoursesPage from './pages/public/CoursesPage';
import CourseDetailPage from './pages/public/CourseDetailPage';
import DashboardPage from './pages/student/DashboardPage';
import LearningPage from './pages/student/LearningPage';

const Dashboard = () => {
  const { user } = React.useContext(AuthContext);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">My Learning Dashboard</h1>
        <p className="text-slate-600 mb-6">Welcome back, {user?.fullName}</p>
        <div className="p-8 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
          You haven't enrolled in any courses yet.
        </div>
      </div>
    </div>
  );
}

const ProtectedRoute = ({ children }) => {
  const { token } = React.useContext(AuthContext);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Public Routes with Main Layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:slug" element={<CourseDetailPage />} />
            
            {/* Protected Routes inside Main Layout */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
          </Route>
          
          {/* Learning Page is protected again */}
          <Route path="/learn/:slug" element={
            <ProtectedRoute>
              <LearningPage />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
