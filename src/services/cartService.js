import { apiRequest } from "./api";

export const addProductToCart = (data) => apiRequest("/cart/product" , "POST", data);

export const getAllCartProducts = (userId) => apiRequest(`/cart/products/${userId}`);

export const updateCartItem = (cartId, productQuantity) => apiRequest(`/cart/update/${cartId}/${productQuantity}`, "PUT");

export const deleteCartItems = (id) => apiRequest(`/cart/remove/${id}`, "DELETE");