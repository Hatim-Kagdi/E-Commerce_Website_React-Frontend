import { apiRequest } from "./api";

export const getAllProducts = () => apiRequest("/vendor/products");

export const getProductById = (id) => apiRequest(`/vendor/product/${id}`);

export const addProduct = (data) => apiRequest("/vendor/product", "POST", data);

export const updateProduct = (id, data) => apiRequest(`/vendor/product/${id}`, "PUT", data);

export const deleteProduct = (id) => apiRequest(`/vendor/product/${id}`, "DELETE");