import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Product/Products';
import ProductRegistration from './pages/Product/ProductRegistration';
import Statistics from './pages/Statistics/Statistics';
import StockTracking from './pages/Stock/StockTracking'; 
import './App.css'; 
import VendingMachines from './pages/VendingMachine/VendingMachines';
import VendingMachineRegistration from './pages/VendingMachine/VendingMachineRegistration';
import VendingMachineDetail from './pages/VendingMachine/VendingMachineDetail';
import StaffManagement from './pages/Staff/StaffManagement';
import AddStaff from './pages/Staff/AddStaff'; 
import EditStaff from './pages/Staff/EditStaff'; 
import LogRecords from './pages/Logs/LogRecords'; 
import LoginGoogle from './pages/Login';
import Login from './pages/Login';
import DepartmentRegister from './pages/Department/DepartmentRegister';
import DepartmentList from './pages/Department/DepartmentList';
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
import ListCategory from './pages/Categories/CategoryListPage';
import ProductList from './pages/ProductList/ProductListPage';
import CategoryRegister from './pages/Categories/CategoryAddPage';
import OrderListPage from './pages/Order/OrdersPage';
import OrderDetailPage from './pages/Order/OrderDetailPage';
import Unauthorized from './pages/Unauthorized';
import CustomerDashboard from './pages/Customer/CustomerDashboard';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <>
      {!isLoginPage && <Sidebar />}
      <div className={isLoginPage ? 'login-container' : 'main-content'}>
        {children}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
          <Route path="/categories" element={<ListCategory />} />
          <Route path="/category/:categoryId/products" element={<ProductList />} />
          <Route path="/category/register" element={<CategoryRegister />} />
          <Route path="/orders" element={<OrderListPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
