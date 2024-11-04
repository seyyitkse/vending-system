import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditUser.css'; // Import the CSS file for styling

const EditUser = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [departments, setDepartments] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:44395/api/AppUser/${userId}`);
        const user = response.data;
        setEmail(user.email);
        setFullName(user.fullName);
        setDepartmentName(user.departmentName); // Assuming the API returns departmentName
      } catch (error) {
        toast.error('Kullanıcı bilgileri yüklenirken bir hata oluştu: ' + error.message);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get('https://localhost:44395/api/Departments');
        setDepartments(response.data);
      } catch (error) {
        toast.error('Departmanlar yüklenirken bir hata oluştu: ' + error.message);
      }
    };

    const fetchUserRoles = async () => {
      try {
        const response = await axios.get(`https://localhost:44395/api/AppUser/getUserRoles/${userId}`);
        const roles = response.data;
        // Show dropdown if the user has the 'Admin' role
        if (roles.includes('Admin')) {
          setShowDropdown(true);
          setIsAdmin(true);
        }
      } catch (error) {
        toast.error('Kullanıcı rolleri yüklenirken bir hata oluştu: ' + error.message);
      }
    };

    fetchUserDetails();
    fetchDepartments();
    fetchUserRoles();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      fullName,
      departmentName, // Send departmentName to the API
    };
    console.log('Submitting payload:', payload); // Log the payload for debugging
    try {
      const response = await axios.put(`https://localhost:44395/api/AppUser/${userId}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message); // Use the message from the API response
        setTimeout(() => {
          if (isAdmin) {
            navigate('/admin-management'); // Redirect to admin user listing page
          } else {
            navigate('/customer-management'); // Redirect to customer listing page
          }
        }, 2000); // Wait for 2 seconds before redirecting
      } else {
        toast.error('Güncelleme başarısız: ' + response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error('Güncelleme başarısız: ' + error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('Sunucuya ulaşılamadı. Lütfen daha sonra tekrar deneyin.');
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error('Bir hata oluştu: ' + error.message);
      }
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Kullanıcı Bilgilerini Düzenle</h2>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            readOnly
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Ad Soyad:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        {showDropdown && (
          <div className="form-group">
            <label>Departman:</label>
            <select
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
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
        )}
        <button type="submit" className="btn btn-primary">Güncelle</button>
      </form>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default EditUser;