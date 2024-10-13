import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiVendingMachine } from "react-icons/gi";
import { FaHome, FaBox, FaChartBar, FaClipboardList, FaUser, FaCogs } from 'react-icons/fa'; // Import the new icon

import './Sidebar.css'; // CSS file

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Otomat Takip</h2>
      <ul>
        <li><Link to="/"><FaHome /> Ana Sayfa</Link></li>
        <li><Link to="/products"><FaBox /> Ürünler</Link></li>
        <li><Link to="/statistics"><FaChartBar /> İstatistikler</Link></li>
        <li><Link to="/stock-tracking"><FaClipboardList /> Stok Takibi</Link></li>
        <li><Link to="/vending-machine"><FaCogs /> Otomatlar</Link></li> {/* New Item */}
        <li><Link to="/vending-machine-registration"><GiVendingMachine  /> Otomat Kayıt</Link></li> {/* New Item */}
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
