import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import './StaffManagement.css'; // Paylaşılan CSS dosyası

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [departmentIdToDelete, setDepartmentIdToDelete] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('https://localhost:44395/api/Departments');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDepartments(data);
        setFilteredDepartments(data);
      } catch (error) {
        setError('Failed to load departments.');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    setModalOpen(true);
    setDepartmentIdToDelete(id);
  };

  const confirmDelete = async () => {
    const response = await fetch(`https://localhost:44395/api/Departments/${departmentIdToDelete}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setDepartments(departments.filter((dept) => dept.departmentID !== departmentIdToDelete));
      setFilteredDepartments(filteredDepartments.filter((dept) => dept.departmentID !== departmentIdToDelete));
      setModalOpen(false);
    } else {
      setError('Failed to delete the department');
      setModalOpen(false);
    }
  };

  useEffect(() => {
    const filtered = departments.filter((dept) =>
      dept.name.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredDepartments(filtered);
  }, [filterText, departments]);

  const columns = [
    {
      name: '#',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Departman Adı',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'İşlemler',
      cell: (row) => (
        <div className="button-group">
          <Link to={`/departments/update/${row.departmentID}`} className="btn btn-edit">
            <i className="fas fa-edit"></i> Düzenle
          </Link>
          <button onClick={() => handleDelete(row.departmentID)} className="btn btn-delete">
            <i className="fas fa-trash-alt"></i> Sil
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="staff-management-container">
      <h1>Departmanlar</h1>

      <input
        type="text"
        placeholder="Departman Ara..."
        className="search-box"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <DataTable
        columns={columns}
        data={filteredDepartments}
        pagination
        highlightOnHover
        striped
        subHeader
        noDataComponent="No departments found"
      />

      <div className="actions">
        <Link to="/departments/register" className="btn btn-add">
          <i className="fas fa-plus"></i> Departman Ekle
        </Link>
      </div>

      {isModalOpen && (
        <div className="modal">
          <h2>Silme Onayı</h2>
          <p>Bu departmanı gerçekten silmek istiyor musunuz?</p>
          <button onClick={confirmDelete} className="btn btn-confirm">Evet</button>
          <button onClick={() => setModalOpen(false)} className="btn btn-cancel">Hayır</button>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
