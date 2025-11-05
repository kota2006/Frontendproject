import React, { useEffect, useState } from 'react'
import ResourceList from '../components/ResourceList'

export default function StudentDashboard({ user }){
  const [programs, setPrograms] = useState([])

  useEffect(()=>{
    fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/programs')
      .then(r=>r.json()).then(setPrograms).catch(()=>{});
  },[])

  return (
    <div>
      <h2>Student Dashboard</h2>
      <section>
        <h3>Health Resources</h3>
        <ResourceList />
      </section>
      <section>
        <h3>Wellness Programs</h3>
        <div className="grid">
          {programs.map(p=> (
            <div className="card" key={p._id}>
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              <small>Category: {p.category}</small>
              <form method="post" onSubmit={async (e)=>{e.preventDefault();
                const token = localStorage.getItem('sw_token');
                await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/programs/'+p._id+'/join', { method:'POST', headers: { Authorization: 'Bearer '+token } });
                alert('Joined program');
              }}>
                <button>Join</button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
