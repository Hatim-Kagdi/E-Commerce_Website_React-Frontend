import { Navigate, useNavigate } from "react-router-dom";

function AdminDashboard(){
    const navigate = useNavigate();

    const handleLogOut = () =>{
    localStorage.removeItem("token");
    navigate("/login");
};

    return (
        <div>
    <h2>Welcome Admin!</h2>
    <ul>
        <li><a onClick={() => navigate("/admin/users")}>View All Users</a></li>
        <li><a onClick={() => navigate("/admin/category/view")}>View All Categories</a></li>
        <li><a onClick={() => navigate("/admin/category/add")}>Add New Categories</a></li>
    </ul><br/><br/>
     <button onClick={handleLogOut}>LOGOUT</button>
    </div>
    );
}

export default AdminDashboard;