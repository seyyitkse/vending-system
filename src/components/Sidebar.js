import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBox, FaChartBar, FaClipboardList, FaUser } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Otomat Takip</h2>
      <ul>
        <li><Link to="/"><FaHome /> Giriş</Link></li>
        <li><Link to="/products"><FaBox /> Ürünler</Link></li>
        <li><Link to="/statistics"><FaChartBar /> İstatistikler</Link></li>
        <li><Link to="/stock-tracking"><FaClipboardList /> Stok Takibi/Güncelleme</Link></li>
      </ul>
      <div className="user-info" 
           onMouseEnter={() => setIsMenuOpen(true)} 
           onMouseLeave={() => setIsMenuOpen(false)}>
        <FaUser size={30} className="user-icon" />
        <div className="user-details">
          <span className="user-name">John Doe</span>
          <span className="user-role">Admin</span>
        </div>
        {isMenuOpen && (
          <div className="user-menu">
            <Link to="/profile">Profilim</Link>
            <Link to="/logout">Çıkış Yap</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
