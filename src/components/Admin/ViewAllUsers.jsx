import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUsers } from "../../services/userService";


function AdminUsers() {
const navigate = useNavigate(); 
const [users, setUsers] = useState([]);
const [role, setRole] = useState("");

const fetchUsers = async () => {
    try {
        const data = await getUsers(role);
        setUsers(data);
    } catch (err) {
        console.error("Error fetching users:", err);
        alert("Failed to load users");
    }
};

useEffect(() => {
    fetchUsers();
}, [role]);

const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    
    if (!confirmDelete) return;

    try {
        await deleteUser(id);
        fetchUsers();
    } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete user");
    }
};

return (
    <div>
        <h2>Admin Users</h2>

        <select onChange={(e) => setRole(e.target.value)}>
            <option value="">All</option>
            <option value="ROLE_CUSTOMER">Customer</option>
            <option value="ROLE_VENDOR">Vendor</option>
        </select>

        <table border="1" cellPadding={"5"}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Role</th>
                    <th>Address</th>
                    <th>Birth Date</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {users.map((user) => (
                    <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td>{user.userName}</td>
                        <td>{user.userEmail}</td>
                        <td>{user.userMobileNumber}</td>
                        <td>{user.role}</td>
                        <td>{user.userAddress}</td>
                        <td>{user.userBirthDate}</td>
                        <td>{new Date(user.userCreatedAt).toLocaleString()}</td>
                        <td>{new Date(user.userUpdatedAt).toLocaleString()}</td>
                        <td>
                            <button onClick={() => navigate(`/admin/users/${user.userId}`)}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(user.userId)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table><br/><br/>
       <button onClick={() => navigate("/admin/dashboard")}>BACK</button>
    </div>
);

}

export default AdminUsers;
