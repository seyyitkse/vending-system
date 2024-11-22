import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiVendingMachine, GiSecretBook } from "react-icons/gi";
import { FaHome, FaBox, FaChartBar, FaClipboardList, FaUser, FaCogs, FaUsers, FaUserCog } from 'react-icons/fa';
import { PiTreeStructureDuotone } from "react-icons/pi";
import { TbUsersGroup } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { FaUserGear } from "react-icons/fa6";

import './Sidebar.css';

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

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
    
        <li onClick={() => toggleMenu('vending')} className="accordion-header">
          <div className="accordion-toggle">
            <FaCogs />
            <span className={openMenu === 'vending' ? 'bold' : ''}>Otomat Yönetimi</span>
          </div>
          <span className={openMenu === 'vending' ? 'arrow open' : 'arrow'}>&#9660;</span>
        </li>
        <ul className={`accordion-content ${openMenu === 'vending' ? 'open' : ''}`}>
          <li className={isActive('/vending-machine') ? 'active' : ''}>
            <Link to="/vending-machine"><GiVendingMachine /> Otomatlar</Link>
          </li>
        </ul>

        <li className={isActive('/log-records') ? 'active' : ''}>
          <Link to="/log-records"><GiSecretBook /> Log Kayıtları</Link>
        </li>
        <li className={isActive('/departments/list') ? 'active' : ''}>
          <Link to="/departments/list"><PiTreeStructureDuotone /> Departmanlar</Link>
        </li>
        <li onClick={() => toggleMenu('role')} className="accordion-header">
          <div className="accordion-toggle">
            <TbUsersGroup />
            <span className={openMenu === 'role' ? 'bold' : ''}>Rol Yönetimi</span>
          </div>
          <span className={openMenu === 'role' ? 'arrow open' : 'arrow'}>&#9660;</span>
        </li>
        <ul className={`accordion-content ${openMenu === 'role' ? 'open' : ''}`}>
          <li className={isActive('/roles') ? 'active' : ''}>
            <Link to="/roles"><FaUserCog /> Roller</Link>
          </li>
          <li className={isActive('/role-management') ? 'active' : ''}>
            <Link to="/role-management"><FaUsers /> Kullanıcı Rolleri</Link>
          </li>
        </ul>

        <li onClick={() => toggleMenu('user')} className="accordion-header">
          <div className="accordion-toggle">
            <FaUserGear />
            <span className={openMenu === 'user' ? 'bold' : ''}>Kullanıcı Yönetimi</span>
          </div>
          <span className={openMenu === 'user' ? 'arrow open' : 'arrow'}>&#9660;</span>
        </li>
        <ul className={`accordion-content ${openMenu === 'user' ? 'open' : ''}`}>
          <li className={isActive('/customer-management') ? 'active' : ''}>
            <Link to="/customer-management"><FiUsers /> Müşteriler</Link>
          </li>
          <li className={isActive('/admin-management') ? 'active' : ''}>
            <Link to="/admin-management"><RiCustomerService2Line /> Adminler</Link>
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