import { useNavigate } from "react-router-dom";

function ViewAllProducts(){
    const navigate = useNavigate();

    return (
        <div>
            <h2>Products Page</h2>
            <button onClick={() => navigate("/customer/dashboard")}>BACK</button>
        </div>
    );
};

export default ViewAllProducts;