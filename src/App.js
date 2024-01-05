// import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ITLayout from "./components/ITTechnician/ITLayout/ITLayout";
import CheckTickets from "./components/ITTechnician/checkTickets/CheckTickets";
import Employees from "./components/ITTechnician/employees/Employees";
import AddAssets from "./components/ITTechnician/employees/addAssets/AddAssets";
import ChangePassword from "./components/ITTechnician/changePassword/ChangePassword";
import TechnicianProfile from "./components/ITTechnician/technicianProfile/TechnicianProfile";

import AssetsCategory from "./components/admin/assetsCategory/AssetsCategory";
import AdminLayout from "./components/admin/layout/AdminLayout";
import Profile from "./components/admin/profile/Profile";
import AddNew from "./components/admin/employees/AddNew";
import AllEmployees from "./components/admin/employees/AllEmployees";
import Ticket from "./components/admin/ticket/Ticket";
import Assets from "./components/admin/assets/Assets";

import EmployeeLayout from "./components/employeePanel/layout/EmployeeLayout";
import Create from "./components/employeePanel/ticket/Create";
import MyTicket from "./components/employeePanel/ticket/MyTicket";
import EmployeePassword from './components/employeePanel/employeePassword/EmployeePassword';
import EmployeeProfile from "./components/employeePanel/employeeProfile/EmployeeProfile";

import StoreKeeperPassword from "./components/storeKeeper/storeKeeperPassword/StoreKeeperPassword";
import StoreKeeperProfile from "./components/storeKeeper/storeKeeperProfile/StoreKeeperProfile";
import Navbar from "./components/navbar/Navbar";

import Login from "./components/login/Login";
import AssetsLayout from "./components/ITTechnician/employees/addAssets/AssetsLayout";







function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/admin-profile" element={<Profile />} />
          <Route path="/admin-ticket" element={<Ticket />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/assets-category" element={<AssetsCategory />} />
          <Route path="/add-employee" element={<AddNew />} />
          <Route path="/all-employees" element={<AllEmployees />} />
          <Route path="/storeKeeper/*" element={<Navbar />} />
          <Route path="/storeKeeper-change-password" element={<StoreKeeperPassword />} />
          <Route path="/storeKeeper-profile" element={<StoreKeeperProfile />} />
          <Route path="/employee/*" element={<EmployeeLayout />} />
          <Route path="/create-ticket" element={<Create />} />
          <Route path="/my-ticket" element={<MyTicket />} />
          <Route path="/employee-change-password" element={<EmployeePassword />} />
          <Route path="/employee-profile" element={<EmployeeProfile />} />
          <Route path="/ITTechnician/*" element={<ITLayout />} />
          <Route path="/check-tickets" element={<CheckTickets />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/add-assets" element={<AddAssets />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/profile" element={<TechnicianProfile />} />
          <Route path="/ITTechnician/add-assets/:attendanceId" element={<AssetsLayout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
