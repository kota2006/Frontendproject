import React, { useState, useEffect } from 'react'
import { getJson, postJson, putJson, deleteJson, authHeaders } from '../services/api'

export default function AdminProgramManager(){
  const [programs, setPrograms] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title:'', description:'', category:'', sessionTopic:'' })
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if(!form.title || !form.title.trim()) e.title = 'Title is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const load = async () => {
    setLoading(true)
    try{
      const data = await getJson('/api/programs')
      setPrograms(data || [])
    }catch(err){ setMsg('Error loading programs') }
    setLoading(false)
  }

  useEffect(()=>{ load() },[])

  const submit = async (e) => {
    e && e.preventDefault();
    if(!validate()) return
    setActionLoading(true)
    try{
      const headers = authHeaders();
      const payload = { title: form.title, description: form.description, category: form.category, sessions: [] };
      if(form.sessionTopic) payload.sessions.push({ date: new Date(), topic: form.sessionTopic })
      if(editing){
        await putJson(`/api/programs/${editing._id}`, payload, { headers });
        setMsg('Program updated');
      } else {
        await postJson('/api/programs', payload, { headers });
        setMsg('Program created');
      }
      setForm({ title:'', description:'', category:'', sessionTopic:'' })
      setEditing(null)
      await load();
    }catch(err){ setMsg(err.message || 'Error') }
    setActionLoading(false)
  }

  const startEdit = (p) => { setEditing(p); setForm({ title:p.title, description:p.description, category:p.category, sessionTopic:'' }) }
  const remove = async (p) => {
    if(!confirm('Delete program?')) return;
    setActionLoading(true)
    try{
      const headers = authHeaders();
      await deleteJson(`/api/programs/${p._id}`, { headers });
      setMsg('Deleted');
      await load();
    }catch(err){ setMsg('Error deleting') }
    setActionLoading(false)
  }

  return (
    <div>
      {msg && <div className="card">{msg}</div>}

      <form className="card" onSubmit={submit}>
        <h4>{editing ? 'Edit Program' : 'Create Program'}</h4>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} disabled={actionLoading} />
        {errors.title && <div className="error">{errors.title}</div>}
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} disabled={actionLoading} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} disabled={actionLoading} />
        <input placeholder="Session topic (optional)" value={form.sessionTopic} onChange={e=>setForm({...form, sessionTopic:e.target.value})} disabled={actionLoading} />
        <button type="submit" disabled={actionLoading}>{actionLoading ? 'Saving...' : (editing ? 'Update' : 'Create')}</button>
        {editing && <button type="button" onClick={()=>{ setEditing(null); setForm({ title:'', description:'', category:'', sessionTopic:'' }); setErrors({}) }} disabled={actionLoading}>Cancel</button>}
      </form>

      {loading ? <div className="card">Loading programs...</div> : (
        <div className="grid">
          {programs.map(p=> (
            <div className="card" key={p._id}>
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              <small>Category: {p.category} — Members: {p.members ? p.members.length : 0}</small>
              <div style={{marginTop:8}}>
                <button onClick={()=>startEdit(p)} disabled={actionLoading}>Edit</button>
                <button onClick={()=>remove(p)} style={{marginLeft:8}} disabled={actionLoading}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
