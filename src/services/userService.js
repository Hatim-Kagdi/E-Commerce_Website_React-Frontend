import { apiRequest } from "./api";

// GET all users
export const getUsers = (role) => {
    return apiRequest(`/admin/users${role ? `?role=${role}` : ""}`);
};

// GET user by ID
export const getUserById = (id) => {
    return apiRequest(`/admin/users/${id}`);
};

// UPDATE user
export const updateUser = (id, userData) => {
    return apiRequest(`/admin/users/${id}`, "PUT", userData);
};

// DELETE user
export const deleteUser = (id) => {
    return apiRequest(`/admin/users/${id}`, "DELETE");
};