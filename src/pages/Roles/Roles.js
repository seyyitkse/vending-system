import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import './Roles.css'; // Use the existing shared CSS

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('https://localhost:44395/api/Role');
        if (!response.ok) {
          throw new Error('Ağ bağlantısı düzgün değil.');
        }
        const data = await response.json();
        setRoles(data);
        setFilteredRoles(data);
      } catch (error) {
        setError('Roller yüklenirken hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []); 

  useEffect(() => {
    const filtered = roles.filter((role) =>
      role.name.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredRoles(filtered);
  }, [filterText, roles]);

  const columns = [
    {
      name: '#',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Rol Adı',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'İşlemler',
      cell: (row) => (
        <div className="button-group">
          <Link to={`/roles/update/${row.id}`} className="btn btn-edit-rolelist">
            <i className="fas fa-edit"></i> Düzenle
          </Link>
        </div>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="staff-management-container">
      <h1>Roller</h1>

      <input
        type="text"
        placeholder="Rol Ara..."
        className="search-box"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <DataTable
        columns={columns}
        data={filteredRoles}
        pagination
        highlightOnHover
        striped
        subHeader
        noDataComponent="Rol Bulunamadı..."
      />

      <div className="actions">
        <Link to="/roles-registration" className="btn btn-add">
          <i className="fas fa-plus"></i> Rol Ekle
        </Link>
      </div>

    </div>
  );
};

export default RoleList;
