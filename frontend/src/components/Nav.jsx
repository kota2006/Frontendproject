import React from 'react'

export default function Nav({ user, setUser }){
  const logout = () => {
    localStorage.removeItem('sw_token');
    localStorage.removeItem('sw_user');
    setUser(null);
  }
  return (
    <header className="nav">
      <div className="nav-left">Student Wellness</div>
      <div className="nav-right">
        {user ? (
          <>
            <span>{user.name} ({user.role})</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <span>Welcome</span>
        )}
      </div>
    </header>
  )
}
