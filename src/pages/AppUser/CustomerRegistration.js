import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminRegistration.css'; // Import the common CSS file for styling

const CustomerRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Şifreler eşleşmiyor!');
      return;
    }
    try {
      const payload = {
        mail: email,
        password: password,
        confirmPassword: confirmPassword,
        firstName: firstName,
        lastName: lastName,
        departmentName: 'Customer', // Set department name to "Customer"
      };
      console.log('Submitting payload:', payload); // Log the payload for debugging
      const response = await axios.post('https://localhost:44395/api/Auth/RegisterCustomer', payload);
      if (response.data.isSuccess) {
        toast.success('Kayıt başarılı!');
        setTimeout(() => {
          navigate('/customer-management'); // Redirect to customer user list page
        }, 2000); // Wait for 2 seconds before redirecting
      } else {
        toast.error('Kayıt başarısız: ' + response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('API Error:', error.response.data); // Log the detailed error response
        toast.error('Bir hata oluştu: ' + error.response.data.message);
      } else {
        console.error('Error:', error.message); // Log the error message
        toast.error('Bir hata oluştu: ' + error.message);
      }
    }
  };

  return (
    <div className="admin-registration-container"> {/* Use the same container class */}
      <h2>Müşteri Kaydı</h2>
      <form onSubmit={handleSubmit} className="admin-registration-form"> {/* Use the same form class */}
        <div className="form-group">
          <label>Ad:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Soyad:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Şifreyi Onayla:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Kaydol</button>
      </form>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default CustomerRegistration;