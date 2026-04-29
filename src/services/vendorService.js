import { apiRequest } from "./api";

export const getVendorAnalytics = (userId) => apiRequest(`/vendor/analytics/${userId}`);

export const getVendorProductDetails = (userId) => apiRequest(`/admin/vendorDetails/${userId}`);