import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCartItems, getAllCartProducts, updateCartItem } from "../../../services/cartService";
import { checkOut } from "../../../services/orderService";

function ViewCartProducts(){
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    const fetchCartItems = async() => {
        try{
            const userId = localStorage.getItem("userId");
            const data = await getAllCartProducts(userId);
            setCart(data);
        }catch(err){
            console.error(err);
        }
    };

    useEffect(() => {
      fetchCartItems();
    }, []);

    const handleUpdate = async(cartId, newQuantity) => {
        if(newQuantity < 1){
            alert("Quantity cannot be less than 1.");
            return;
        }

        try{
            await updateCartItem(cartId, newQuantity);
            fetchCartItems();
        }catch(err){
            alert("Stock limit reached!");
        }
    };

    const handleDelete = async(id) =>{
        if(window.confirm("Are you sure you want to remove the item from cart?")){
            try{
            await deleteCartItems(id);
            alert("Item removed from cart!");
            fetchCartItems();
        }catch(err){
            console.error(err);
        }
        }
    };

    const handleCheckOut = async() => {
        const userId = localStorage.getItem("userId");
        if(window.confirm("Confirm Order Placement!")){
            try{
                await checkOut(userId);
                alert("Order Placed!");
                navigate("/customer/orders");
            }catch(err){
                alert("Order not placed!");
                console.error(err);
            }
    }
    };

    const grandTotal = cart.reduce((sum, item) => sum + item.productTotal, 0);

    return (
        <div>
            <h2>View Cart Page</h2>

            <table border={1} cellPadding={5}>
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Product Stock</th>
                        <th>Total</th>
                        <th> Quantity</th>
                        <th>Remove item</th>
                    </tr>
                </thead>
                <tbody>
                    { cart.length > 0 ? (
                    cart.map(c => (
                        <tr key={c.cartId}>
                            <td>{c.productId}</td>
                            <td>{c.productName}</td>
                            <td>{c.productPrice}</td>
                            <td>{c.productStock}</td>
                            <td>{c.productTotal}</td>
                            <td>
                                <button onClick={() => handleUpdate(c.cartId, c.productQuantity - 1)}>-</button>
                                {c.productQuantity}
                                <button onClick={() => handleUpdate(c.cartId, c.productQuantity + 1)}>+</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(c.cartId)}>DELETE</button>
                            </td>
                        </tr>
                    ))
                ) : (
                      <tr>
                        <td colSpan="9" style={{ textAlign: "center" }}>
                            No products added to cart at the moment.<br/>
                            <button onClick={() => navigate("/customer/products")}>ADD PRODUCTS TO CART</button>
                        </td>
                        </tr>
                )}
                </tbody>
            </table><br/><br/>
                <h4>Grand Total : {grandTotal}</h4><br/><br/>
                <button onClick={handleCheckOut}>PROCEED TO CHECKOUT</button><br/>
            <button onClick={() => navigate("/customer/dashboard")}>BACK</button>
        </div>
    );
};

export default ViewCartProducts;