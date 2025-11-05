import React from 'react'

export default function Modal({ title, children, onCancel, onConfirm, confirmLabel='Confirm' }){
  return (
    <div className="modal-backdrop">
      <div className="modal">
        {title && <h4>{title}</h4>}
        <div className="modal-body">{children}</div>
        <div className="modal-actions">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}
