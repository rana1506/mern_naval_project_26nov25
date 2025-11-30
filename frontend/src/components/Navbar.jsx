import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import getDashboardRoute from '../utils/getDashboardRoute'

export default function Navbar() {
  const { user, logout } = useAuth();
    return (
      <nav style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
        <Link to="/">Home</Link> 
        <Link to={getDashboardRoute(user)} style={{ marginLeft: 10 }}>
          {user ? "Dashboard" : null}
        </Link> 
        <Link to={user ? "/" : "/login"} onClick={user ? logout : null} style={{ marginLeft: 10 }}>
          {user ? "Logout" : "Login"}
        </Link>
        {user ? <span> | User: {user.name} | Role: {user?.roles.join(", ")}</span> : null}
      </nav>
    )
}
