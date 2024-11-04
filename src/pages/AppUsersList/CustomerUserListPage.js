import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserListPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const CustomerUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    fetchCustomerUsers();
  }, []);

  const fetchCustomerUsers = async () => {
    try {
      const response = await axios.get('https://localhost:44395/api/AppUser/getCustomerList');
      const usersWithRoles = response.data.map(user => ({
        ...user,
        displayName: `${user.fullName} (Customer)`,
      }));
      setUsers(usersWithRoles);
      setFilteredUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching customer users:', error);
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

  const handleDelete = (userId) => {
    setModalOpen(true);
    setUserIdToDelete(userId);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://localhost:44395/api/AppUser/${userIdToDelete}`);
      setUsers(users.filter(user => user.id !== userIdToDelete));
      setFilteredUsers(filteredUsers.filter(user => user.id !== userIdToDelete));
      toast.success('User deleted successfully.');
    } catch (error) {
      setError('Error deleting user.');
      toast.error('Error deleting user.');
    } finally {
      setModalOpen(false);
    }
  };

  const columns = [
    { name: 'Name', selector: (row) => row.displayName, sortable: true },
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

  if (error) return <div>{error}</div>;

  return (
    <div className="user-list-page">
      <div className="header-container">
        <h2 className='DataTable__header'>Müşteri Kullanıcı Listesi</h2>

        <input
          type="text"
          placeholder="İsim ya da mail ile kullanıcı ara..."
          value={searchText}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        highlightOnHover
        responsive
      />
        <div className="button-container">
          <Link to="/register-user" className="btn btn-add-user">
            <FontAwesomeIcon icon={faPlus} /> Kullanıcı Ekle
          </Link>
          <button onClick={fetchCustomerUsers} className="btn btn-refresh">
            <FontAwesomeIcon icon={faSyncAlt} /> Sayfayı Yenile
          </button>
        </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Silme Onayı</h2>
            <p>Bu kullanıcıyı gerçekten silmek istiyor musunuz?</p>
            <button onClick={confirmDelete} className="btn btn-confirm">Evet</button>
            <button onClick={() => setModalOpen(false)} className="btn btn-cancel">Hayır</button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default CustomerUserListPage;