import React from 'react';
import '../styles/Loading.css';

const Loading = ({ size = 'medium', overlay = false }) => {
  const spinnerClass = `spinner spinner-${size}${overlay ? ' spinner-overlay' : ''}`;
  
  return (
    <div className={spinnerClass}>
      <div className="spinner-circle"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;