import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './StaffManagement.css'; // Import your CSS file for styling

const StaffManagement = () => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      const response = await fetch('http://localhost:5077/api/Staff');
      const data = await response.json();
      setStaffList(data);
    };

    fetchStaff();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5077/api/Staff?id=${id}`, {
      method: 'DELETE',
    });
    setStaffList(staffList.filter((staff) => staff.staffID !== id));
  };

  return (
    <div className="staff-management-container">
      <h1>Staff Management</h1>
      <table className="staff-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.staffID}>
              <td>{staff.name}</td>
              <td>{staff.title}</td>
              <td>
                <Link to={`/edit-staff/${staff.staffID}`} className="btn btn-edit">Edit</Link>
                <button onClick={() => handleDelete(staff.staffID)} className="btn btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add-staff" className="btn btn-add">Add Staff</Link>
    </div>
  );
};

export default StaffManagement;
