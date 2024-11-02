import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles
import './RoleUpdate.css'; // Import the CSS file for roles

const RoleUpdate = () => {
  const { id } = useParams(); // Get the role ID from the URL
  const navigate = useNavigate();

  const [role, setRole] = useState({
    roleId: 0,
    name: ""
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch role details by ID
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get(`https://localhost:44395/api/Role/${id}`);
        setRole(response.data);
      } catch (err) {
        setError("Rol getirilirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, [id]);

  // Handle input change for role name
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRole((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submit to update the role
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:44395/api/Role/${id}`, role);
      toast.success("Rol güncelleme işlemi başarılı!", {
        position: "top-right", // Use string instead of constant
        autoClose: 2000 // Auto close after 3 seconds
      });
      setTimeout(() => {
        navigate("/roles"); // Redirect to role list page after toast notification
      }, 2000); // Delay to match toast duration
    } catch (err) {
      setError("Rol güncelleme işlemi başarısız oldu.");
      toast.error("Rol güncelleme işlemi başarısız oldu.", {
        position: "top-right", // Use string instead of constant
        autoClose: 2000 // Auto close after 3 seconds
      });
    }
  };

  // Render loading state, error, or form
  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="update-role-container">
      <h2>Update Role</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rol Adı:</label>
          <input
            type="text"
            name="name"
            value={role.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Rolü Güncelle</button>
      </form>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default RoleUpdate;