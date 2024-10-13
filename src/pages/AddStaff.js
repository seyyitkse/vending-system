import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification'; // Correct import for default export
import './AddStaff.css';

const AddStaff = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState({
    name: '',
    title: '',
    socialMedia1: '',
    socialMedia2: '',
    socialMedia3: '',
    image: '',
  });
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5077/api/Staff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(staff),
    });
    
    // Show notification
    setNotification('Staff member added successfully!');
    
    // Redirect after a timeout
    setTimeout(() => {
      navigate('/staff-management');
      setNotification(null); // Clear notification
    }, 3000); // 3 seconds delay
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="add-staff-container">
      <h1>Add Staff</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={staff.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={staff.title}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="socialMedia1"
          placeholder="Social Media 1"
          value={staff.socialMedia1}
          onChange={handleChange}
        />
        <input
          type="url"
          name="socialMedia2"
          placeholder="Social Media 2"
          value={staff.socialMedia2}
          onChange={handleChange}
        />
        <input
          type="url"
          name="socialMedia3"
          placeholder="Social Media 3"
          value={staff.socialMedia3}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={staff.image}
          onChange={handleChange}
        />
        <button type="submit">Add Staff</button>
      </form>
      
      {notification && (
        <Notification message={notification} onClose={handleCloseNotification} />
      )}
    </div>
  );
};

export default AddStaff;
