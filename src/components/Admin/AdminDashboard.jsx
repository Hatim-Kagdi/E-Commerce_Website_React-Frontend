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
    <li>
        <ul><a onClick={() => navigate("/admin/users")}>View All Users</a></ul>
    </li><br/><br/>
     <button onClick={handleLogOut}>LOGOUT</button>
    </div>
    );
}

export default AdminDashboard;