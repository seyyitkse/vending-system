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
import ProtectedRoute from './pages/ProtectedRoute';
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
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="Admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-registration"
            element={
              <ProtectedRoute>
                <ProductRegistration />
              </ProtectedRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stock-tracking"
            element={
              <ProtectedRoute>
                <StockTracking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vending-machine"
            element={
              <ProtectedRoute>
                <VendingMachines />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vending-machine-registration"
            element={
              <ProtectedRoute>
                <VendingMachineRegistration />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vending-machine-detail/:id"
            element={
              <ProtectedRoute>
                <VendingMachineDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff-management"
            element={
              <ProtectedRoute>
                <StaffManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/log-records"
            element={
              <ProtectedRoute>
                <LogRecords />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-staff/:id"
            element={
              <ProtectedRoute>
                <EditStaff />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-staff"
            element={
              <ProtectedRoute>
                <AddStaff />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginGoogle />} />
          <Route
            path="/departments/register"
            element={
              <ProtectedRoute>
                <DepartmentRegister />
              </ProtectedRoute>
            }
          />
          <Route
            path="/departments/list"
            element={
              <ProtectedRoute>
                <DepartmentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/departments/update/:id"
            element={
              <ProtectedRoute>
                <DepartmentUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roles"
            element={
              <ProtectedRoute>
                <Roles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roles-registration"
            element={
              <ProtectedRoute>
                <RoleRegistration />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roles/update/:id"
            element={
              <ProtectedRoute>
                <RoleUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/role-management"
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-management"
            element={
              <ProtectedRoute>
                <CustomerListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-management"
            element={
              <ProtectedRoute>
                <AdminUserListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register-customer"
            element={
              <ProtectedRoute>
                <CustomerRegistration />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register-admin"
            element={
              <ProtectedRoute>
                <AdminRegistration />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/update/:id"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <ListCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:categoryId/products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/register"
            element={
              <ProtectedRoute>
                <CategoryRegister />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/unauthorized"
            element={
              <ProtectedRoute>
                <Unauthorized />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        
      </Layout>
    </Router>
  );
}

export default App;