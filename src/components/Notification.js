// Notification.js
import React, { useEffect } from 'react';
import './Notification.css'; // CSS dosyanız

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    // Timer'ı burada tanımlayın
    const timer = setTimeout(() => {
      onClose(); // Bildirim otomatik olarak kapanır
    }, 3000); // 3 saniye bekleme

    return () => clearTimeout(timer); // Timer'ı temizle
  }, [onClose]);

  return (
    <div className="notification">
      <p>{message}</p>
      <button className="close-btn" onClick={onClose}>X</button>
    </div>
  );
};

export default Notification; // Varsayılan olarak dışa aktarma
