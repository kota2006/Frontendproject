import React, { useEffect, useState } from 'react'

export default function ResourceList(){
  const [resources, setResources] = useState([])
  useEffect(()=>{
    fetch((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/resources')
      .then(r=>r.json()).then(setResources).catch(()=>{});
  },[])
  return (
    <div className="grid">
      {resources.map(r=> (
        <div className="card" key={r._id}>
          <h4>{r.title}</h4>
          <p>{r.description}</p>
          {r.link && <a href={r.link} target="_blank" rel="noreferrer">Open</a>}
          <small>{r.category}</small>
        </div>
      ))}
    </div>
  )
}
