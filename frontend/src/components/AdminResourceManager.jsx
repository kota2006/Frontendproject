import React, { useEffect, useState } from 'react'
import { getJson, postJson, putJson, deleteJson, authHeaders } from '../services/api'
import Toast from './Toast'
import Modal from './Modal'

export default function AdminResourceManager(){
  const [resources, setResources] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title:'', description:'', category:'', link:'' })
  const [msg, setMsg] = useState(null)
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [modalTarget, setModalTarget] = useState(null)

  const validate = () => {
    const e = {}
    if(!form.title || !form.title.trim()) e.title = 'Title is required'
    if(!form.category || !form.category.trim()) e.category = 'Category is recommended'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const load = async () => {
    setLoading(true)
    try{
      const data = await getJson('/api/resources')
      setResources(data || [])
    }catch(err){ setToast('Error loading resources') }
    setLoading(false)
  }

  useEffect(()=>{ load() },[])

  const submit = async (e) => {
    e && e.preventDefault();
    if(!validate()) return
    setActionLoading(true)
    try{
      const headers = authHeaders();
      if(editing){
        await putJson(`/api/resources/${editing._id}`, form, { headers });
        setToast('Resource updated')
      } else {
        await postJson('/api/resources', form, { headers });
        setToast('Resource created')
      }
      setForm({ title:'', description:'', category:'', link:'' });
      setEditing(null)
      await load();
    }catch(err){ setToast(err.message || 'Error') }
    setActionLoading(false)
  }

  const startEdit = (r) => { setEditing(r); setForm({ title:r.title, description:r.description, category:r.category, link:r.link }) }
  const remove = async (r) => {
    setModalTarget(r)
  }

  const confirmRemove = async () => {
    const r = modalTarget
    if(!r) return
    setActionLoading(true)
    try{
      const headers = authHeaders();
      await deleteJson(`/api/resources/${r._id}`, { headers });
      setToast('Resource deleted');
      await load();
    }catch(err){ setToast('Error deleting') }
    setActionLoading(false)
    setModalTarget(null)
  }

  return (
    <div>
  {toast && <Toast message={toast} onClose={()=>setToast(null)} />}
      <form className="card" onSubmit={submit}>
        <h4>{editing ? 'Edit Resource' : 'New Resource'}</h4>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} disabled={actionLoading} />
        {errors.title && <div className="error">{errors.title}</div>}
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} disabled={actionLoading} />
        {errors.category && <div className="error">{errors.category}</div>}
        <input placeholder="Link (optional)" value={form.link} onChange={e=>setForm({...form, link:e.target.value})} disabled={actionLoading} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} disabled={actionLoading} />
        <button type="submit" disabled={actionLoading}>{actionLoading ? 'Saving...' : (editing ? 'Update' : 'Create')}</button>
        {editing && <button type="button" onClick={()=>{ setEditing(null); setForm({ title:'', description:'', category:'', link:'' }); setErrors({}) }} disabled={actionLoading}>Cancel</button>}
      </form>

      {loading ? <div className="card">Loading resources...</div> : (
        <div className="grid">
          {resources.map(r=> (
            <div className="card" key={r._id}>
              <h4>{r.title}</h4>
              <p>{r.description}</p>
              <small>{r.category}</small>
              <div style={{marginTop:8}}>
                <button onClick={()=>startEdit(r)} disabled={actionLoading}>Edit</button>
                <button onClick={()=>remove(r)} style={{marginLeft:8}} disabled={actionLoading}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {modalTarget && (
        <Modal title="Delete resource" onCancel={()=>setModalTarget(null)} onConfirm={confirmRemove} confirmLabel="Delete">
          Are you sure you want to delete "{modalTarget.title}"?
        </Modal>
      )}
    </div>
  )
}
