import { apiRequest } from "./api";

export const getAllProducts = () => apiRequest("/vendor/products");

export const getProductById = (id) => apiRequest(`/vendor/product/${id}`);

export const addProduct = async (formData) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8080/vendor/product", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
            // DO NOT set Content-Type here; the browser sets it automatically for FormData
        },
        body: formData
    });
    return response.json();
};

export const updateProduct = async(id, formData) => {
    const token = localStorage.getItem("token");
    const resp = await fetch(`http://localhost:8080/vendor/product/${id}` , {
        method : "PUT",
        headers : {
            "Authorization" : `Bearer ${token}`
        },
        body : formData
    });

    return resp.json();
};

export const deleteProduct = (id) => apiRequest(`/vendor/product/${id}`, "DELETE");