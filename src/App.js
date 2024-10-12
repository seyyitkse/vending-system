import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Statistics from './pages/Statistics';
import StockTracking from './pages/StockTracking'; // Ekledik
import './App.css'; // CSS dosyasını buraya dahil edin

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/stock-tracking" element={<StockTracking />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
