import { useNavigate } from "react-router-dom";

function BuyProductNow(){
    const navigate = useNavigate();

    return (
        <div>
            <h2>Product Buy Now Page</h2>
            <button onClick={() => navigate("/customer/products")}>BACK</button>
        </div>
    );
};

export default BuyProductNow;