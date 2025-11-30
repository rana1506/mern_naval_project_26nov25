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
        console.log(divs)
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);
  return (
    <DashboardLayout title="Admin Dashboard">
      <h1>Admin Panel</h1>
      <p>View your profile, division details, and notifications here.</p>
      <div style={{ padding: 20 }}>        
        <h3>Divisions</h3>
        <ul>{divs.map(d => <li key={d._id}>{d.name} — DO: {d.do?.name || '—'}</li>)}</ul>
      </div>
    </DashboardLayout>
  );
}
