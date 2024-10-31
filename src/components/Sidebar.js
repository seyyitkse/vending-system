import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiVendingMachine } from "react-icons/gi";
import { FaHome, FaBox, FaChartBar, FaClipboardList, FaUser, FaCogs, FaUsers } from 'react-icons/fa';
import { GiSecretBook } from "react-icons/gi";
import { PiTreeStructureDuotone } from "react-icons/pi";
import { TbUsersGroup } from "react-icons/tb";
import './Sidebar.css';

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Otomat Takip</h2>
      <ul>
        {/* Menu items */}
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
        <li className={isActive('/log-records') ? 'active' : ''}>
          <Link to="/log-records"><GiSecretBook /> Log Kayıtları</Link>
        </li>
        <li className={isActive('/departments/list') ? 'active' : ''}>
          <Link to="/departments/list"><PiTreeStructureDuotone /> Departmanlar</Link>
        </li>
        <li onClick={() => setIsRoleOpen(!isRoleOpen)} className="accordion-header">
          <div className="accordion-toggle">
            <TbUsersGroup />
            <span>Roller</span>
          </div>
          <span className={isRoleOpen ? 'arrow open' : 'arrow'}>&#9660;</span>
        </li>
        <ul className={`accordion-content ${isRoleOpen ? 'open' : ''}`}>
        <li className={isActive('/roles') ? 'active' : ''}>
        <Link to="/roles"><TbUsersGroup /> Roller</Link>
        </li>
        <li className={isActive('/user-management') ? 'active' : ''}>
          <Link to="/user-management"><FaUsers /> Kullanıcı Rolleri</Link>
        </li>
        </ul>
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