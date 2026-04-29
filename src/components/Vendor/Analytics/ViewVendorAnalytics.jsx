import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVendorAnalytics } from "../../../services/vendorService";

function ViewVendorAnalytics(){

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [analytics, setAnalytics] = useState({
        totalRevenue : 0.0,
        totalItemsSold : 0,
        pendingOrders : 0,
        totalOrders : 0
    });

    useEffect(() => {
        fetchAnalytics();
    },[userId]);


    const fetchAnalytics = async() => {
        await getVendorAnalytics(userId)
        .then(data => setAnalytics(data))
        .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>VENDOR ANALYTICS </h2>
            <table border={1} cellPadding={5}>
                <thead>
                    <tr>
                        <th>Total Revenue</th>
                        <th>Total Items Sold</th>
                        <th>Pending Orders</th>
                        <th>Total Orders</th>
                    </tr>
                </thead>
                <tbody>
                            <tr>
                                <td>{analytics.totalRevenue}</td>
                                <td>{analytics.totalItemsSold}</td>
                                <td>{analytics.pendingOrders}</td>
                                <td>{analytics.totalOrders}</td>
                            </tr>
                </tbody>
            </table>
            <button onClick={() => navigate("/vendor/dashboard")}>BACK</button>
        </div>
    );
};

export default ViewVendorAnalytics;