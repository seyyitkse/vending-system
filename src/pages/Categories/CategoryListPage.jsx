import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CategoryListPage.css';

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://localhost:44395/api/Categories');
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (error) {
      setError('Error fetching categories');
      toast.error('Error fetching categories');
    }
  };

  const handleSearch = (event) => {
    const text = event.target.value;
    setSearchText(text);

    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const columns = [
    { name: '#', selector: (row, index) => index + 1, sortable: false, width: '50px' },
    { name: 'Kategori Adı', selector: (row) => row.name, sortable: true },
    {
      name: 'Ürün Sayısı',
      selector: (row) => row.products.length,
      sortable: true,
    },
    {
      name: 'İşlemler',
      cell: (row) => (
        <div className="button-group">
          <Link to={`/category/${row.categoryId}`} className="btn btn-view-products">
            Ürünleri Gör
          </Link>
        </div>
      ),
    },
  ];

  if (error) return <div>{error}</div>;

  return (
    <div className="category-list-page">
      <div className="header-container">
        <h2 className="DataTable__header">Kategori Listesi</h2>
      </div>

      <input
        type="text"
        placeholder="Kategori ismi ile ara"
        value={searchText}
        onChange={handleSearch}
        className="search-box"
      />

      <DataTable
        columns={columns}
        data={filteredCategories}
        pagination
        highlightOnHover
        responsive
        noDataComponent={<p>Gösterilecek kategori yok!</p>} // Show a message if no data is available
      />

      <div className="button-container">
        <Link to="/category/add" className="btn btn-add-category">
          <FontAwesomeIcon icon={faPlus} /> Kategori Ekle
        </Link>
        <button onClick={fetchCategories} className="btn btn-refresh">
          <FontAwesomeIcon icon={faSyncAlt} /> Sayfayı Yenile
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default CategoryListPage;
