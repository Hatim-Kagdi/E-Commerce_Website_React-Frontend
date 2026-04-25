import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProductsForCustomer } from "../../services/customerService";

function ViewAllProducts(){
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    },[]);

    const fetchProducts = async() => {
        const data = await getAllProductsForCustomer();
        setProducts(data);
    }

    return (
        <div>
            <h2>Products Page</h2>
            <table border={1} cellPadding={5}>
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Product Desription</th>
                        <th>Product Price</th>
                        <th>Product Stock</th>
                        <th>Product Image</th>
                        <th>Category Name</th>
                        <th>Vendor Name</th>
                        <th>Actions </th>
                    </tr>
                </thead>
                <tbody>
                { products.length > 0 ? (
                products.map(p => (
                        <tr key={p.productId}>
                            <td>{p.productId}</td>
                            <td>{p.productName}</td>
                            <td>{p.productDescription}</td>
                            <td>{p.productPrice}</td>
                            <td>{p.productStock}</td>
                            <td>
                                <img 
                                    src={`http://localhost:8080/uploads/${p.productImageUrl}`} 
                                    alt={p.productName} 
                                    style={{ width: "50px", height: "50px", objectFit: "cover" }} 
                                />
                            </td>
                            <td>{p.categoryName}</td>
                            <td>{p.vendorName}</td>
                            <td>
                                <button onClick={() => navigate("/customer/cart")}>ADD TO CART</button>
                                <button onClick={() => navigate("/customer/buy")}>BUY NOW</button>
                            </td>
                        </tr>
                ))
            ) : (
                        <tr>
                        <td colSpan="9" style={{ textAlign: "center" }}>
                            No products available at the moment.
                        </td>
                        </tr>
            )
                }
                </tbody>
            </table>
            <button onClick={() => navigate("/customer/dashboard")}>BACK</button>
        </div>
    );
};

export default ViewAllProducts;