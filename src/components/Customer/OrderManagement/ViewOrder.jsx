import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cancelOrder, getPlacedOrders } from "../../../services/orderService";

function ViewOrders() {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem("userId");

    const fetchOrders = async() => {
        await getPlacedOrders(userId)
        .then(data => setOrders(data))
        .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchOrders();
    },[userId]);

    const handleCancelOrder = async(orderId) => {
        if(window.confirm("Confirm Order Cancellation")){
            try{
            await cancelOrder(orderId);
            alert("Order Deleted!");
            fetchOrders();
            }catch(err){
                alert("Delete Failed!");
                console.error(err);
            }
        }
    }

    return (
        <div>
            <h2>Your Orders</h2>
            <table border={1} cellPadding={5}>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Vendor Name</th>
                        <th>Vendor Address</th>
                        <th>Vendor Email</th>
                        <th>Vendor Mobile Number</th>
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
                            <td>{o.userAddress}</td>
                            <td>{o.userEmail}</td>
                            <td>{o.userMobileNumber}</td>
                            <td>{o.quantity}</td>
                            <td>{o.orderTotal}</td>
                            <td>{o.orderStatus}</td>
                            <td>{new Date(o.orderDate).toLocaleString()}</td>
                            <td>      {
                                o.orderStatus === "PLACED" ?(
                                <button onClick={() => handleCancelOrder(o.orderId)}>CANCEL</button>
                                ) : (
                                    <span>Cannot Cancel order </span>
                                )
                                } 
                                
                            </td>
                        </tr>
                    ))
                   ) : (
                        <tr>
                            <td colSpan="12" style={{ textAlign: "center" }}>
                            No products added to cart at the moment.
                        </td>
                        </tr>
                   )}
                </tbody>
            </table>
            <button onClick={() => navigate("/customer/dashboard")}>BACK</button>
        </div>
    );
};

export default ViewOrders;