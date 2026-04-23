import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminUsers from "./components/Admin/UserManagement/ViewAllUsers";
import UserEditForm from "./components/Admin/UserManagement/UserEditForm";
import Login from "./components/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./components/Register";
import AdminDashboard from "./components/Admin/AdminDashboard";
import CustomerDashboard from "./components/Customer/CustomerDashboard";
import VendorDashboard from "./components/Vendor/VendorDashboard";
import ViewAllCategories from "./components/Admin/CategoryManagement/ViewAllCategory";
import CategoryEditForm from "./components/Admin/CategoryManagement/CategoryEditForm";
import CategoryAddForm from "./components/Admin/CategoryManagement/CategoryAddForm";

function App() {
return ( 
<BrowserRouter>
<Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register/>}></Route>
        <Route path="/admin/users" element={
            <ProtectedRoute allowedRole="ROLE_ADMIN"><AdminUsers/></ProtectedRoute>}>
            </Route>
        <Route  path="/admin/users/:id" element={
            <ProtectedRoute allowedRole="ROLE_ADMIN"><UserEditForm/></ProtectedRoute>
            }></Route>
        <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRole="ROLE_ADMIN"><AdminDashboard/></ProtectedRoute>
            }></Route>
        <Route path="/admin/category/view" element={
            <ProtectedRoute allowedRole="ROLE_ADMIN"><ViewAllCategories/></ProtectedRoute>
        }>
        </Route>
        <Route path="/admin/category/add" element={
            <ProtectedRoute allowedRole="ROLE_ADMIN"><CategoryAddForm/></ProtectedRoute>
        }></Route>
        <Route path="/admin/category/:id" element={
            <ProtectedRoute allowedRole="ROLE_ADMIN"><CategoryEditForm/></ProtectedRoute>
        }></Route>
        <Route path="/vendor/dashboard" element={
            <ProtectedRoute allowedRole="ROLE_VENDOR"><VendorDashboard/></ProtectedRoute>
            }></Route>
        <Route path="/customer/dashboard" element={
            <ProtectedRoute allowedRole="ROLE_CUSTOMER"><CustomerDashboard/></ProtectedRoute>
            }></Route>
    
</Routes>
</BrowserRouter>


);
}

export default App;
