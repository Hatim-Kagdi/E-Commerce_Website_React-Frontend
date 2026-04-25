import { useNavigate } from "react-router-dom";

function AddToCart(){
    const navigate = useNavigate();

    return (
        <div>
            <h2>Add to Cart Page</h2>
            <button onClick={() => navigate("/customer/products")}>BACK</button>
        </div>
    );
};

export default AddToCart;