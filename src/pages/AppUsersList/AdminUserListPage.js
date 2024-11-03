import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import './UserListPage.css';

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      const response = await axios.get('https://localhost:44395/api/AppUser/getAdminUsers');
      const usersWithRoles = response.data.map(user => ({
        ...user,
        displayName: `${user.fullName} (Admin)`,
      }));
      setUsers(usersWithRoles);
      setFilteredUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching admin users:', error);
    }
  };

  const handleSearch = (event) => {
    const text = event.target.value;
    setSearchText(text);

    const filtered = users.filter(user =>
      user.displayName.toLowerCase().includes(text.toLowerCase()) ||
      user.email.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://localhost:44395/api/AppUser/${userId}`);
      fetchAdminUsers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const columns = [
    { name: 'Name', selector: (row) => row.displayName, sortable: true },
    { name: 'Email', selector: (row) => row.email, sortable: true },
    { name: 'Phone', selector: (row) => row.phone, sortable: true },
    {
      name: 'İşlemler',
      cell: (row) => (
        <div className="button-group">
          <Link to={`/users/edit/${row.id}`} className="btn btn-edit">
            <i className="fas fa-edit"></i> Düzenle
          </Link>
          <button onClick={() => handleDelete(row.id)} className="btn btn-delete">
            <i className="fas fa-trash-alt"></i> Sil
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="user-list-page">
      <h2 className='DataTable__header'>Admin Kullanıcı Listesi</h2>


      <input
        type="text"
        placeholder="İsim ya da mail ile kullanıcı ara..."
        value={searchText}
        onChange={handleSearch}
        className="search-bar"
      />

      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        highlightOnHover
        responsive
      />
      
      <div className="button-container">
        <Link to="/users/add" className="btn btn-add-user">
          <FontAwesomeIcon icon={faPlus} /> Admin Ekle
        </Link>
        <button onClick={fetchAdminUsers} className="btn btn-refresh">
          <FontAwesomeIcon icon={faSyncAlt} /> Sayfayı Yenile
        </button>
      </div>
    </div>
  );
};

export default AdminUserListPage;