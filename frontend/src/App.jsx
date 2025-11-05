import React, { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'

export default function App(){
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const raw = localStorage.getItem('sw_user');
    if(raw) setUser(JSON.parse(raw));
  },[]);

  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="container">
        {!user && (
          <div className="auth-grid">
            <Login onLogin={setUser} />
            <Register onRegister={setUser} />
          </div>
        )}
        {user && user.role === 'student' && <StudentDashboard user={user} />}
        {user && user.role === 'admin' && <AdminDashboard user={user} />}
      </main>
    </div>
  )
}
