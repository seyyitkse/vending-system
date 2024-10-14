// Notification.js
import React from 'react';
import './Notification.css'; // Assuming you have this CSS file

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification">
      <p>{message}</p>
      <button className="close-btn" onClick={onClose}>X</button>
    </div>
  );
};

export default Notification; // Ensure it's exported as default
