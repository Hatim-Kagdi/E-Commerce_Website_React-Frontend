import { useNavigate } from "react-router-dom";

function VendorDashboard(){

    const navigate = useNavigate();


    const handleLogOut = () => {
        if(window.confirm("Do you want to logout?")){
        localStorage.removeItem("token");
        navigate("/login");
        }
    }
    
    return (
        <div>
        <h2>Welcome to Vendor Dashboard</h2>
        <ul>
            <li onClick={() => navigate("/vendor/products")}>VIEW MY PRODUCTS</li>
            <li onClick={() => navigate("/vendor/product/add")}>ADD NEW PRODUCT</li>
        </ul><br/>

        <button onClick={handleLogOut}>LOGOUT</button>
        </div>
    );
}

export default VendorDashboard;