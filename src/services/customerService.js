import { apiRequest } from "./api"

export const getAllProductsForCustomer = () => apiRequest("/customer/products");