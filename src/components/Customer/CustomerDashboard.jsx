import { useNavigate } from "react-router-dom";

function CustomerDashboard(){

    const navigate = useNavigate();

    const handleLogOut = () =>{
        if(window.confirm("Are you sure you want to logout?")){
            localStorage.removeItem("token");
            navigate("/login");
        }
    }

    return (
        <div>
        <h2>Welcome to Customer Dashboard</h2>

        <ul>
            <li onClick={() => navigate("/customer/products")}>VIEW PRODUCTS</li>
            <li onClick={() => navigate("/customer/cart")}>VIEW CART PRODUCTS</li>
            <li onClick={() => navigate("/customer/orders")}>VIEW ORDERS </li>
        </ul>

        <button onClick={handleLogOut}>LOGOUT</button>
        </div>
    );
}

export default CustomerDashboard;