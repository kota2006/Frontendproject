import React, { useEffect, useState } from 'react'
import AdminResourceManager from '../components/AdminResourceManager'
import AdminProgramManager from '../components/AdminProgramManager'

export default function AdminDashboard(){
  const [metrics, setMetrics] = useState(null)

  useEffect(()=>{
    const token = localStorage.getItem('sw_token');
    fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/metrics', { headers: { Authorization: 'Bearer '+token } })
      .then(r=>r.json()).then(setMetrics).catch(()=>{});
  },[])

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <section>
        <h3>Platform Metrics</h3>
        {metrics ? (
          <ul>
            <li>Users: {metrics.users}</li>
            <li>Resources: {metrics.resources}</li>
            <li>Programs: {metrics.programs}</li>
          </ul>
        ) : <div>Loading...</div>}
      </section>

      <section>
        <h3>Manage Resources</h3>
        <AdminResourceManager />
      </section>

      <section>
        <h3>Create Wellness Programs</h3>
        <AdminProgramManager />
      </section>
    </div>
  )
}
