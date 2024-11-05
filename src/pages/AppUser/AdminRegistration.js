import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminRegistration.css'; // Import the common CSS file for styling

const AdminRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [departmentName, setDepartmentName] = useState(''); // Updated to store department name
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('https://localhost:44395/api/Departments');
      setDepartments(response.data);
      if (response.data.length > 0) {
        setDepartmentName(response.data[0].name); // Set default department to the first department name in the list
      }
    } catch (error) {
      toast.error('Departmanlar yüklenirken bir hata oluştu: ' + error.message);
    }
  };

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
        departmentName: departmentName, // Send department name
      };
      console.log('Submitting payload:', payload); // Log the payload for debugging
      const response = await axios.post('https://localhost:44395/api/Auth/RegisterAdmin', payload);
      if (response.data.isSuccess) {
        toast.success('Kayıt başarılı!');
        setTimeout(() => {
          navigate('/admin-management'); // Redirect to admin user list page
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
    <div className="admin-registration-container">
      <h2>Admin Kaydı</h2>
      <form onSubmit={handleSubmit} className="admin-registration-form">
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
        <div className="form-group">
          <label>Departman:</label>
          <select
            value={departmentName} // Use departmentName here
            onChange={(e) => setDepartmentName(e.target.value)} // Update departmentName on change
            required
            className="form-control"
          >
            {departments.map((department) => (
              <option key={department.id} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Kaydol</button>
      </form>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default AdminRegistration;