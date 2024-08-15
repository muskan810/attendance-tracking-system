import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import AttendanceHistoryPage from './components/AttendanceHistoryPage'; // Import the new page
import './App.css';
import axios from 'axios';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth(token);
    }
  }, []);

  const checkAuth = async (token) => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { 'x-auth-token': token },
      });
      if (res.status === 200) {
        setIsAuthenticated(true);
        setRole(res.data.role);
        navigate(`/${res.data.role}`);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    } catch (err) {
      console.error('Error checking auth:', err);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setRole('');
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to={`/${role}`} /> : <LoginForm />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to={`/${role}`} /> : <LoginForm />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
      <Route path="/admin" element={isAuthenticated && role === 'admin' ? <AdminPage onLogout={handleLogout} /> : <Navigate to="/login" />} />
      <Route path="/user" element={isAuthenticated && role === 'user' ? <UserPage onLogout={handleLogout} /> : <Navigate to="/login" />} />
      <Route path="/attendance-history/:userId" element={isAuthenticated ? <AttendanceHistoryPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? `/${role}` : '/login'} />} />
    </Routes>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
