import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import './CustomerListPage.css';

const CustomerListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('All Users');

  useEffect(() => {
    fetchUsersByRole(selectedRole);
  }, [selectedRole]);

  const fetchUsersByRole = async (role) => {
    try {
      let endpoint;
      if (role === 'All Users') {
        endpoint = 'https://localhost:44395/api/AppUser';
      } else if (role === 'Customer') {
        endpoint = 'https://localhost:44395/api/AppUser/getCustomerList';
      } else if (role === 'Admin') {
        endpoint = 'https://localhost:44395/api/AppUser/getAdminUsers';
      }

      const response = await axios.get(endpoint);
      const usersWithRoles = response.data.map((user) => ({
        ...user,
        displayName: role === 'All Users' ? `${user.fullName} (${user.role})` : `${user.fullName} (${role})`,
      }));
      setUsers(usersWithRoles);
      setFilteredUsers(usersWithRoles);
    } catch (error) {
      console.error(`Error fetching ${role} users:`, error);
    }
  };

  const handleSearch = (event) => {
    const text = event.target.value;
    setSearchText(text);

    const filtered = users.filter((user) =>
      user.displayName.toLowerCase().includes(text.toLowerCase()) ||
      user.email.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const columns = [
    {
      name: '#',
      selector: (row, index) => index + 1, // Add index + 1 for numbering
      sortable: false,
      width: '50px', // Optional: Adjust width if needed
  },
    { name: 'Name', selector: (row) => row.displayName, sortable: true },
    { name: 'Email', selector: (row) => row.email, sortable: true },
    { name: 'Phone', selector: (row) => row.phone, sortable: true },
  ];

  return (
    <div className="customer-list-page">
      <h2>User List</h2>

      <div className="button-container">
        <button onClick={() => fetchUsersByRole(selectedRole)}>Refresh</button>
        <button onClick={() => alert('Add User functionality coming soon!')}>Add User</button>
      </div>

      {/* Role selection dropdown */}
      <select value={selectedRole} onChange={handleRoleChange} className="role-dropdown">
        <option value="All Users">All Users</option>
        <option value="Customer">Customer</option>
        <option value="Admin">Admin</option>
      </select>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchText}
        onChange={handleSearch}
        className="search-bar"
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default CustomerListPage;
