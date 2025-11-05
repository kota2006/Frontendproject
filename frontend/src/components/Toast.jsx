import React, { useEffect } from 'react'

export default function Toast({ message, onClose, type='info' }){
  useEffect(()=>{
    if(!message) return;
    const t = setTimeout(() => onClose(), 4000);
    return () => clearTimeout(t);
  },[message])

  if(!message) return null;

  return (
    <div className={`toast toast-${type}`} role="status">
      {message}
    </div>
  )
}
