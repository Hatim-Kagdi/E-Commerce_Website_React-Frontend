import { apiRequest } from "./api"

export const checkOut = (userId) => apiRequest(`/orders/checkout/${userId}`, "POST");

export const getPlacedOrders = (userId) => apiRequest(`/orders/placedOrder/${userId}`);

export const cancelOrder = (orderId) => apiRequest(`/orders/cancel/${orderId}`, "DELETE");

export const getPlacedOrderForVendor = (userId) => apiRequest(`/orders/vendorOrder/${userId}`);

export const shipOrder = (orderId) => apiRequest(`/orders/ship/${orderId}`, "POST");