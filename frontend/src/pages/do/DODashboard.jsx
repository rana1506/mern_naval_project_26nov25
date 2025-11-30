import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [divs, setDivs] = useState([]);
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/divisions');
        setDivs(data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);
  return (
    <DashboardLayout title="Divisional Officer Dashboard">
      <h1>Divisional Officer Panel</h1>
      <p>Monitor and update sailors under your divisions.</p>
    </DashboardLayout>
  );
}
