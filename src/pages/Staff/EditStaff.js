import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Notification from '../../components/Notification'; // Correct import for default export
import './AddStaff.css';

const EditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      const response = await fetch(`http://localhost:5077/api/Staff/${id}`);
      const data = await response.json();
      setStaff(data);
    };
    fetchStaff();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5077/api/Staff`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(staff),
    });
    
    // Show notification
    setNotification('Staff member updated successfully!');
    
    // Redirect after a timeout
    setTimeout(() => {
      navigate('/staff-management');
      setNotification(null); // Clear notification
    }, 3000); // 3 seconds delay
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  if (!staff) return <div>Loading...</div>;

  return (
    <div className="edit-staff-container">
      <h1>Edit Staff</h1>
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
        <button type="submit">Update Staff</button>
      </form>
      
      {notification && (
        <Notification message={notification} onClose={handleCloseNotification} />
      )}
    </div>
  );
};

export default EditStaff;
