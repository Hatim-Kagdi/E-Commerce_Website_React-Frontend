import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerDetails } from "../../../services/customerService";

function ViewCustomerDetails(){
    const navigate = useNavigate();
    const { userId } = useParams();
    const { userRole } = useParams();
    const [customerDetails, setCustomerDetails] = useState([]);

    const fetchCustomerDetails = async() => {
        await getCustomerDetails(userId)
        .then(data => setCustomerDetails(data))
        .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchCustomerDetails();
    }, [userId]);

    return (
        <div>
            <h2>Customer Details</h2>

            <p>Customer Id : {userId}</p>
            <p>Role : {userRole}</p>
            <p>Order Placed By the Customer</p>
            <table border={1} cellPadding={5}>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Vendor Name</th>
                        <th>Vendor Email</th>
                        <th>Vendor Address</th>
                        <th>Vendor Mobile Number</th>
                        <th>Quantity Ordered</th>
                        <th>Order Status</th>
                        <th>Order Total</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customerDetails.length > 0 ? (
                            customerDetails.map(c => (
                                <tr key={c.orderId}>
                                    <td>{c.orderId}</td>
                                    <td>{c.productName}</td>
                                    <td>{c.productPrice}</td>
                                    <td>{c.userName}</td>
                                    <td>{c.userEmail}</td>
                                    <td>{c.userAddress}</td>
                                    <td>{c.userMobileNumber}</td>
                                    <td>{c.quantity}</td>
                                    <td>{c.orderStatus}</td>
                                    <td>{c.orderTotal}</td>
                                    <td>{new Date(c.orderDate).toLocaleString()}</td>
                                </tr>
                            ))
                            
                        ) : (
                            <tr >
                                <td colSpan="12" style={{ textAlign: "center" }}>
                                    No order placed by the customer</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <button onClick={() => navigate("/admin/users")}>BACK</button>
        </div>
    );
};

export default ViewCustomerDetails;