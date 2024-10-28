import React, { useState } from 'react';
import '../Product/ProductRegistration.css'; // Importing the CSS for styling

const ProductRegistration = () => {
  const [selectedMachine, setSelectedMachine] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const vendingMachines = [
    { id: 1, name: 'Vending Machine A' },
    { id: 2, name: 'Vending Machine B' },
    { id: 3, name: 'Vending Machine C' },
  ];

  const productCategories = [
    { id: 1, name: 'Snacks' },
    { id: 2, name: 'Drinks' },
    { id: 3, name: 'Healthy Options' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Selected Machine:', selectedMachine);
    console.log('Selected Category:', selectedCategory);
  };

  return (
    <div className="product-container">
      <h1>Product Registration Page</h1>
      <div className="product-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="vendingMachine">Select Vending Machine:</label>
            <select
              id="vendingMachine"
              value={selectedMachine}
              onChange={(e) => setSelectedMachine(e.target.value)}
              required
            >
              <option value="">--Select a Vending Machine--</option>
              {vendingMachines.map((machine) => (
                <option key={machine.id} value={machine.id}>
                  {machine.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="productCategory">Select Product Category:</label>
            <select
              id="productCategory"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">--Select a Category--</option>
              {productCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-button">
            Register Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductRegistration;
