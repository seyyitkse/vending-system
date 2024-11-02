import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DepartmentUpdate.css'; // Import the CSS file

const DepartmentUpdate = () => {
  const { id } = useParams(); // Get the department ID from the URL
  const navigate = useNavigate();

  const [department, setDepartment] = useState({
    departmentID: 0,
    name: "",
    appUsers: [] // Initialize as an empty array
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch department details by ID
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`https://localhost:44395/api/Departments/${id}`);
        setDepartment(response.data);
      } catch (err) {
        setError("Departman verileri getirilirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchDepartment();
  }, [id]);

  // Handle input change for department name
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submit to update the department
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:44395/api/Departments/${id}`, department);
      toast.success("Departman güncelleme işlemi başarılı!"); // Success notification
      setTimeout(() => {
        navigate("/departments/list"); // Redirect to department list page after delay
      }, 3000);
    } catch (err) {
      setError("Departman güncelleme hatası.");
      toast.error("Departman güncelleme hatası."); // Error notification
    }
  };

  // Render loading state, error, or form
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="update-department-container">
      <h2>Update Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Department Name:</label>
          <input
            type="text"
            name="name"
            value={department.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Update Department</button>
      </form>

      {/* ToastContainer to show notifications */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </div>
  );
};

export default DepartmentUpdate;
