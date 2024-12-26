import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Products.css'; // Importing the CSS for styling

const Products = () => {
  // Dummy products data
  const products = [
    { id: 1, name: 'Chips', price: '50₺', stock: 20 },
    { id: 2, name: 'Soda', price: '25₺', stock: 15 },
    { id: 3, name: 'Protein Bar', price: '100₺', stock: 10 },
    { id: 4, name: 'Water', price: '10₺', stock: 25 },
    { id: 5, name: 'Juice', price: '30₺', stock: 18 },
    { id: 6, name: 'Candy', price: '15₺', stock: 22 },
    { id: 7, name: 'Gum', price: '5₺', stock: 50 },
    { id: 8, name: 'Cookies', price: '40₺', stock: 12 },
    { id: 9, name: 'Sandwich', price: '60₺', stock: 8 },
    { id: 10, name: 'Milk', price: '20₺', stock: 30 },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="product-container">
      <h1>Available Products</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Products"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="product-list-container">
        {currentProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>
            <Link to={`/product/${product.id}`} className="details-button">
              View Details
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <div className="register-link">
        <Link to="/product-registration" className="register-button">
          Register New Product
        </Link>
      </div>
    </div>
  );
};
export default Products;