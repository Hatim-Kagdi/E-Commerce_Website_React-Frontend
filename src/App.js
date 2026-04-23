import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminUsers from "./components/Admin/ViewAllUsers";
import UserEditForm from "./components/Admin/UserEditForm";
import Login from "./components/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./components/Register";
import AdminDashboard from "./components/Admin/AdminDashboard";
import CustomerDashboard from "./components/Customer/CustomerDashboard";
import VendorDashboard from "./components/Vendor/VendorDashboard";

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
