import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addProductToCart } from "../../../services/cartService";
import { getProductById } from "../../../services/productService";

function AddToCart(){
    const navigate = useNavigate();
    const { productId } = useParams();
    const [product ,setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadProduct = async() => {
            const data = await getProductById(productId);
            setProduct(data);
        };
        loadProduct();
    }, [productId])

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const payload = {
            customer :{ userId : localStorage.getItem("userId")},
            product : { productId : productId},
            productQuantity : quantity
        };

        try{
            await addProductToCart(payload);
            alert("Product added to cart!");
            navigate("/customer/products");
        }catch(err){
            alert("Product Not Added to cart!");
            console.error(err);
        }
    };

    if (!product) {
    return <h2>Loading product details...</h2>;
    }

    return (
        <div>
            <h2>Add to Cart Page</h2>

            <h4>Product Details</h4>
                <div>
                    Product Id : {product.productId}<br/>
                    Product Name : {product.productName}<br/>
                    Product Price : {product.productPrice}<br/>
                    Product Stock : {product.productStock}<br/>
                    <form onSubmit={handleSubmit}>
                        Quantity : <input
                        type="number"
                        name="productQuantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter Product Quantity"
                        min="1"
                        required/><br/>

                        <button type="submit">ADD PRODUCT TO CART</button>
                    </form>
                    </div>
            <button onClick={() => navigate("/customer/products")}>BACK</button>
        </div>
    );
};

export default AddToCart;