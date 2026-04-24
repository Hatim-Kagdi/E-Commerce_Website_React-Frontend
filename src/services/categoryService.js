import { apiRequest } from "./api";

export const getAllCategories = () => apiRequest("/admin/categories");

export const getCategoryById = (id) => apiRequest(`/admin/category/${id}`);

export const addCategory = (data) => apiRequest("/admin/category", "POST", data);

export const updateCategory = (id, data) => apiRequest(`/admin/category/${id}`, "PUT", data);

export const deleteCategory = (id) => apiRequest(`/admin/category/${id}`, "DELETE");