import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to track current route
import { GiVendingMachine } from "react-icons/gi";
import { FaHome, FaBox, FaChartBar, FaClipboardList, FaUser, FaCogs ,FaUsers } from 'react-icons/fa';
// import { SiAwselasticloadbalancing } from "react-icons/si";
import { GiSecretBook } from "react-icons/gi";

import './Sidebar.css'; // CSS file

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Hook to get the current route

  // Function to check if the current path matches the route
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Otomat Takip</h2>
      <ul>
        <li className={isActive('/') ? 'active' : ''}>
          <Link to="/"><FaHome /> Ana Sayfa</Link>
        </li>
        <li className={isActive('/products') ? 'active' : ''}>
          <Link to="/products"><FaBox /> Ürünler</Link>
        </li>
        <li className={isActive('/statistics') ? 'active' : ''}>
          <Link to="/statistics"><FaChartBar /> İstatistikler</Link>
        </li>
        <li className={isActive('/stock-tracking') ? 'active' : ''}>
          <Link to="/stock-tracking"><FaClipboardList /> Stok Takibi</Link>
        </li>
        <li className={isActive('/vending-machine') ? 'active' : ''}>
          <Link to="/vending-machine"><FaCogs /> Otomatlar</Link>
        </li>
        <li className={isActive('/vending-machine-registration') ? 'active' : ''}>
          <Link to="/vending-machine-registration"><GiVendingMachine /> Otomat Kayıt</Link>
        </li>
        <li className={isActive('/staff-management') ? 'active' : ''}>
          <Link to="/staff-management"><FaUsers /> Çalışan Yönetimi</Link>
        </li>
        <li className={isActive('/log-records') ? 'active' : ''}>
          <Link to="/log-records"><GiSecretBook /> Log Kayıtları</Link>
        </li>
      </ul>
      <div 
        className="user-info"
        onMouseEnter={() => setIsMenuOpen(true)} 
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <div className="user-icon">
          <FaUser size={30} />
        </div>
        <div className="user-details">
          <div className="user-name">John Doe</div>
          <div className="user-role">Admin</div>
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
