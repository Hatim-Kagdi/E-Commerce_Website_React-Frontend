import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVendorProductDetails } from "../../../services/vendorService";

function ViewVendorDetails(){
    const navigate = useNavigate();
    const { userId } = useParams();
    const { userRole } = useParams();
    const [vendorDetails, setVendorDetails] = useState([]);

    const fetchVendorDetails = async() => {
        await getVendorProductDetails(userId)
        .then(data => setVendorDetails(data))
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchVendorDetails();
    }, [userId])

    return (
        <div>
            <h2>Vendor Details Page</h2>
            <p>Vendor id : {userId}</p>
            <p>Role : {userRole}</p>
            <p>Vendor's Products</p>

            <table border={1} cellPadding={5}>
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Product Description</th>
                        <th>Product Price</th>
                        <th>Product Stock</th>
                        <th>Product Created At</th>
                        <th>Product Updated At</th>
                        <th>Product Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vendorDetails.length > 0 ? (
                            vendorDetails.map(v => (
                                <tr key={v.productId}>
                                    <td>{v.productId}</td>
                                    <td>{v.productName}</td>
                                    <td>{v.productDescription}</td>
                                    <td>{v.productPrice}</td>
                                    <td>{v.productStock}</td>
                                    <td>{new Date(v.createdAt).toLocaleString()}</td>
                                    <td>{new Date(v.updatedAt).toLocaleString()}</td>
                                    <td>{v.categoryName}</td>
                                </tr>
                            )) 
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: "center" }}>
                                        No products for this vendor
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
            <button onClick={() => navigate("/admin/users")}>BACK</button>
        </div>
    );
};

export default ViewVendorDetails;