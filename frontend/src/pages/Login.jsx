import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import getDashboardRoute from '../utils/getDashboardRoute'

export default function Login() {
  const [serviceNo, setServiceNo] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(serviceNo, password);

      navigate(getDashboardRoute(user));
      
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div><input placeholder="ServiceNo" value={serviceNo} onChange={e => setServiceNo(e.target.value)} /></div>
        <div><input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /></div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
