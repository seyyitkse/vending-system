import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      const response = await axios.get('https://localhost:44395/api/AppUser/getAdminUsers');
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      setError('Admin kullanıcıları yüklenirken bir hata oluştu: ' + error.message);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    const filtered = users.filter(user =>
      user.fullName.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = (userId) => {
    setUserIdToDelete(userId);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://localhost:44395/api/AppUser/${userIdToDelete}`);
      setUsers(users.filter(user => user.id !== userIdToDelete));
      setFilteredUsers(filteredUsers.filter(user => user.id !== userIdToDelete));
      setModalOpen(false);
      setUserIdToDelete(null);
    } catch (error) {
      setError('Kullanıcı silinirken bir hata oluştu: ' + error.message);
    }
  };

  const columns = [
    { name: 'Name', selector: (row) => row.fullName, sortable: true },
    { name: 'Email', selector: (row) => row.email, sortable: true },
    { name: 'Department', selector: (row) => row.departmentName, sortable: true },
    {
      name: 'İşlemler',
      cell: (row) => (
        <div className="button-group">
          <Link to={`/user/update/${row.id}`} className="btn btn-edit">
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
      <div className="header-container">
        <h2 className='DataTable__header'>Admin Kullanıcı Listesi</h2>
        <input
          type="text"
          placeholder="İsim ya da mail ile kullanıcı ara..."
          value={searchText}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        highlightOnHover
        responsive
      />

      <div className="button-container">
        <Link to="/register-user" className="btn btn-add-user">
          <FontAwesomeIcon icon={faPlus} /> Admin Ekle
        </Link>
        <button onClick={fetchAdminUsers} className="btn btn-refresh">
          <FontAwesomeIcon icon={faSyncAlt} /> Sayfayı Yenile
        </button>
      </div>

      {/* Modal for delete confirmation */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h4>Kullanıcıyı silmek istediğinize emin misiniz?</h4>
            <button onClick={confirmDelete} className="btn btn-confirm">Evet</button>
            <button onClick={() => setModalOpen(false)} className="btn btn-cancel">Hayır</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserListPage;