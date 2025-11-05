import React, { useState } from 'react'

export default function Register({ onRegister }){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)

  const submit = async (e) => {
    e.preventDefault(); setErr(null)
    try{
      const res = await fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/auth/register', {
        method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.message || 'Register failed');
      localStorage.setItem('sw_token', data.token);
      localStorage.setItem('sw_user', JSON.stringify(data.user));
      onRegister(data.user);
    }catch(err){ setErr(err.message) }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h3>Register</h3>
      {err && <div className="error">{err}</div>}
      <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  )
}
