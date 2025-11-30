import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import DODashboard from './pages/do/DODashboard';
import SailorDashboard from './pages/sailor/SailorDashboard';
import Navbar from './components/Navbar';
export default function App() {
  const { user, logout } = useAuth();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admindashboard" element={<RoleProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></RoleProtectedRoute>} />
        <Route path="/dodashboard" element={<RoleProtectedRoute allowedRoles={["do"]}><DODashboard /></RoleProtectedRoute>} />
        <Route path="/sailordashboard" element={
          <RoleProtectedRoute allowedRoles={["sailor"]}>
            <SailorDashboard />
          </RoleProtectedRoute>
        } />
      </Routes>
    </div>
  );
}
