import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserListPage.css';

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      const response = await axios.get('https://localhost:44395/api/AppUser/getAdminUsers');
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Error fetching admin users:', error);
    }
  };

  const handleSearch = (event) => {
    const text = event.target.value;
    setSearchText(text);

    const filtered = users.filter((user) =>
      user.fullName.toLowerCase().includes(text.toLowerCase()) ||
      user.email.toLowerCase().includes(text.toLowerCase())
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
      toast.success('Kullanıcı başarıyla silindi.');
    } catch (error) {
      setError('Kullanıcı silinirken bir hata oluştu.');
      toast.error('Kullanıcı silinirken bir hata oluştu.');
    } finally {
      setModalOpen(false);
    }
  };

  const columns = [
    { name: '#', selector: (row, index) => index + 1, sortable: false, width: '50px' },
    { name: 'Kullanıcı İsmi', selector: (row) => row.fullName, sortable: true },
    { name: 'Mail Adresi', selector: (row) => row.email, sortable: true },
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

  if (error) return <div>{error}</div>;
  return (
    <div className="user-list-page">
      <div className="header-container">
        <h2 className='DataTable__header'>Admin Kullanıcı Listesi</h2>
      </div>

      <input
        type="text"
        placeholder="İsim veya e-posta ile ara"
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
        noDataComponent={<p>Gösterilecek log kaydı yok!</p>} // Show a message if no data is available
      />

      <div className="button-container">
        <Link to="/register-admin" className="btn btn-add-user">
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

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default AdminUserListPage;