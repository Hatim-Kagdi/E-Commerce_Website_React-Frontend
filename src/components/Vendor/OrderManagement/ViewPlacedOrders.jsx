import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlacedOrderForVendor, shipOrder } from "../../../services/orderService";

function ViewPlacedOrder(){

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem("userId");

    const fetchOrders = async() => {
        await getPlacedOrderForVendor(userId)
        .then(data => setOrders(data))
        .catch(err => console.error(err));
    };

    const handleShipping = async(orderId) => {
        if(window.confirm("Are you ready to ship ?")){
            await shipOrder(orderId);
            fetchOrders();
            alert("Order Shipped for Order Id :" + orderId);
        }
    };

    useEffect(() => {
        fetchOrders();
    },[userId]);

    return (
        <div>
            <h2>ORDER PLACED</h2>

            <table border={1} cellPadding={5}>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th>Customer Address</th>
                        <th>Customer Mobile Number</th>
                        <th>Order Quantity</th>
                        <th>Order Total</th>
                        <th>Order Status</th>
                        <th>Order Placed At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { orders.length > 0 ? (
                        orders.map(o => (
                            <tr key={o.orderId}>
                                <td>{o.orderId}</td>
                                <td>{o.productName}</td>
                                <td>{o.productPrice}</td>
                                <td>{o.userName}</td>
                                <td>{o.userEmail}</td>
                                <td>{o.userAddress}</td>
                                <td>{o.userMobileNumber}</td>
                                <td>{o.quantity}</td>
                                <td>{o.orderTotal}</td>
                                <td>{o.orderStatus}</td>
                                <td>{new Date(o.orderDate).toLocaleString()}</td>
                                <td> { o.orderStatus === "PLACED" ? (
                                    <button onClick={() => handleShipping(o.orderId)}>SHIP ORDER</button>
                                ) : (
                                    <span>ORDER SHIPPED</span>
                                )
                                    }
                                    
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="12" style={{ textAlign: "center" }}>
                            No orders placed for your products.
                        </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button onClick={() => navigate("/vendor/dashboard")}>BACK</button>
        </div>
    );

};

export default ViewPlacedOrder;