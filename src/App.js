import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Product/Products';
import ProductRegistration from './pages/Product/ProductRegistration';
import  Statistics from './pages/Statistics/Statistics';
import StockTracking from './pages/Stock/StockTracking'; 
import './App.css'; 
import VendingMachines from './pages/VendingMachine/VendingMachines';
import VendingMachineRegistration from './pages/VendingMachine/VendingMachineRegistration'; // Ekledik
import VendingMachineDetail from './pages/VendingMachine/VendingMachineDetail';
import StaffManagement from './pages/Staff/StaffManagement';
import AddStaff from './pages/Staff/AddStaff'; 
import EditStaff from './pages/Staff/EditStaff'; 
import LogRecords from './pages/Logs/LogRecords'; 
import LoginGoogle from './pages/Login'
import DepartmentRegister from './pages/Department/DepartmentRegister'; // Departman kayıt bileşeni
import DepartmentList from './pages/Department/DepartmentList'; // Departman listeleme bileşeni
import DepartmentUpdate from './pages/Department/DepartmentUpdate';
import Roles from './pages/Roles/Roles';
import RoleRegistration from './pages/Roles/RoleRegistration';
import RoleUpdate from './pages/Roles/RoleUpdate';
import UserManagement from './pages/AppUser/UserManagement';
import CustomerListPage from './pages/AppUsersList/CustomerUserListPage';
import AdminUserListPage from './pages/AppUsersList/AdminUserListPage';
import CustomerRegistration from './pages/AppUser/CustomerRegistration';
import AdminRegistration from './pages/AppUser/AdminRegistration';
import EditUser from './pages/AppUsersList/EditUser';

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-registration" element={<ProductRegistration />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/stock-tracking" element={<StockTracking />} />
            <Route path="/vending-machine" element={<VendingMachines />} />
            <Route path="/vending-machine-registration" element={<VendingMachineRegistration />} />
            <Route path="/vending-machine-detail/:id" element={<VendingMachineDetail />} />
            <Route path="/staff-management" element={<StaffManagement />} />
            <Route path="/log-records" element={<LogRecords />} />
            <Route path="/edit-staff/:id" element={<EditStaff />} />
            <Route path="/add-staff" element={<AddStaff />} />
            <Route path="/login" element={<LoginGoogle />} />
            <Route path="/departments/register" element={<DepartmentRegister />} />
            <Route path="/departments/list" element={<DepartmentList />} />
            <Route path="/departments/update/:id" element={<DepartmentUpdate />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/roles-registration" element={<RoleRegistration />} />
            <Route path="/roles/update/:id" element={<RoleUpdate />} />
            <Route path="/role-management" element={<UserManagement />} />
            <Route path="/customer-management" element={<CustomerListPage />} />
            <Route path="/admin-management" element={<AdminUserListPage />} />
            <Route path="/register-customer" element={<CustomerRegistration />} />
            <Route path="/register-admin" element={<AdminRegistration />} />
            <Route path="/user/update/:id" element={<EditUser />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;