import { apiRequest } from "./api"

export const getAllProductsForCustomer = () => apiRequest("/customer/products");

export const getCustomerDetails = (userId) => apiRequest(`/admin/customerDetails/${userId}`);