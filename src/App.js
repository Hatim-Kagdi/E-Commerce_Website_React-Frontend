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
import ViewAllProducts from "./components/Customer/ViewAllProducts";
import ViewCartProducts from "./components/Customer/CartManagement/ViewCartProducts";
import ViewOrders from "./components/Customer/OrderManagement/ViewOrder";
import AddToCart from "./components/Customer/CartManagement/AddToCartForm";
import ProductAddForm from "./components/Vendor/ProductManagement/ProductAddForm";
import ViewMyProducts from "./components/Vendor/ProductManagement/ViewMyProducts";
import ProductEditForm from "./components/Vendor/ProductManagement/ProductEditForm";
import ViewPlacedOrder from "./components/Vendor/OrderManagement/ViewPlacedOrders";

function App() {
return ( 
<BrowserRouter>
<Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register/>}></Route>
{/* -------------------------------------------------------------------------------------------- */}
         {/* Admin Routes */}
        <Route path="/admin/users" element={
            <ProtectedRoute allowedRole="ROLE_ADMIN"><AdminUsers/></ProtectedRoute>}>
            </Route>
        <Route  path="/admin/users/:id" element={
            <ProtectedRoute allowedRole="ROLE_ADMIN"><UserEditForm/></ProtectedRoute>
            }></Route>
        <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRole="ROLE_ADMIN"><AdminDashboard/></ProtectedRoute>
            }></Route>
        <Route path="/admin/categories" element={
            <ProtectedRoute allowedRole="ROLE_ADMIN"><ViewAllCategories/></ProtectedRoute>
        }>
        </Route>
        <Route path="/admin/category/add" element={
            <ProtectedRoute allowedRole="ROLE_ADMIN"><CategoryAddForm/></ProtectedRoute>
        }></Route>
        <Route path="/admin/category/:id" element={
            <ProtectedRoute allowedRole="ROLE_ADMIN"><CategoryEditForm/></ProtectedRoute>
        }></Route>
{/* -------------------------------------------------------------------------------------------- */}
        {/* Vendor Routes */}
        <Route path="/vendor/dashboard" element={
            <ProtectedRoute allowedRole="ROLE_VENDOR"><VendorDashboard/></ProtectedRoute>
            }></Route>
        <Route path="/vendor/product/add" element={
            <ProtectedRoute allowedRole="ROLE_VENDOR"><ProductAddForm/></ProtectedRoute>
            }></Route>
        <Route path="/vendor/products" element={
            <ProtectedRoute allowedRole="ROLE_VENDOR"><ViewMyProducts/></ProtectedRoute>
            }></Route>
        <Route path="/vendor/product/:productId" element={
            <ProtectedRoute allowedRole="ROLE_VENDOR"><ProductEditForm/></ProtectedRoute>
            }></Route>
        <Route path="/vendor/orders" element={
            <ProtectedRoute allowedRole="ROLE_VENDOR"><ViewPlacedOrder/></ProtectedRoute>
            }></Route>
{/* -------------------------------------------------------------------------------------------- */}
        {/* Customer Routes */}
        <Route path="/customer/dashboard" element={
            <ProtectedRoute allowedRole="ROLE_CUSTOMER"><CustomerDashboard/></ProtectedRoute>
            }></Route>
        <Route path="/customer/products" element={
            <ProtectedRoute allowedRole="ROLE_CUSTOMER"><ViewAllProducts/></ProtectedRoute>
            }></Route>
        <Route path="/customer/cart/:productId" element={
            <ProtectedRoute allowedRole="ROLE_CUSTOMER"><AddToCart/></ProtectedRoute>
            }></Route>
        <Route path="/customer/cart" element={
            <ProtectedRoute allowedRole="ROLE_CUSTOMER"><ViewCartProducts/></ProtectedRoute>
            }></Route>
        <Route path="/customer/orders" element={
            <ProtectedRoute allowedRole="ROLE_CUSTOMER"><ViewOrders/></ProtectedRoute>
            }></Route>
</Routes>
</BrowserRouter>


);
}

export default App;
