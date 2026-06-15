import React, { createContext, useState, useEffect } from 'react';
import axiosClient from '../services/axiosClient';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axiosClient.post('/auth/login', { email, password });
      handleAuthSuccess(response);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (fullName, email, password) => {
    setLoading(true);
    try {
      const response = await axiosClient.post('/auth/register', { fullName, email, password });
      handleAuthSuccess(response);
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = (response) => {
    setToken(response.token);
    const userData = { email: response.email, fullName: response.fullName, role: response.role };
    setUser(userData);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
