import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../../components/Notification'; // Notification component
import './DepartmentManagement.css'; // CSS file for styling

const DepartmentRegister = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', visible: false, type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('https://localhost:44395/api/Departments', {
        name: departmentName,
      });
      if (response.status === 200) {
        setNotification({ message: 'Departman başarıyla kaydedildi!', visible: true, type: 'success' });
        setDepartmentName(''); // Reset input
      }
    } catch (error) {
      console.error('Departman kaydedilirken hata oluştu:', error);
      setNotification({ message: 'Departman kaydedilirken hata oluştu.', visible: true, type: 'error' });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  return (
    <div className="department-register-container">
      <h1>Departman Kaydı</h1>
      <form onSubmit={handleSubmit} className="department-form">
        <div>
          <label htmlFor="departmentName">Departman Adı:</label>
          <input
            type="text"
            id="departmentName"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
            placeholder="Departman adını girin..."
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </form>

      {notification.visible && (
        <Notification 
          message={notification.message} 
          onClose={handleCloseNotification} 
          type={notification.type} // Pass notification type for styling
        />
      )}
    </div>
  );
};

export default DepartmentRegister;
