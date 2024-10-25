import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css'; // Importing the CSS for styling

const Products = () => {
  // Dummy products data
  const products = [
    { id: 1, name: 'Chips', price: '50₺', stock: 20, machineId: 1, categoryId: 1 },
    { id: 2, name: 'Soda', price: '25₺', stock: 15, machineId: 1, categoryId: 2 },
    { id: 3, name: 'Protein Bar', price: '100₺', stock: 10, machineId: 2, categoryId: 3 },
    { id: 4, name: 'Water', price: '10₺', stock: 25, machineId: 3, categoryId: 2 },
  ];

  return (
    <div className="product-container">
      <h1>Available Products</h1>
      <div className="product-list-container">
        {products.map(product => (
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
      <div className="register-link">
        <Link to="/product-registration" className="register-button">
          Register New Product
        </Link>
      </div>
    </div>
  );
};

export default Products;
