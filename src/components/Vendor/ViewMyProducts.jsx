import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../../services/productService";

function ViewMyProducts(){
    const navigate = useNavigate();
    const [products , setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    },[]);

    const fetchProducts = async () =>{
        const data = await getAllProducts();
        setProducts(data);
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this product?")){
            await deleteProduct(id);
            fetchProducts();
        }
    }

    return (
        <div>
            <h2>Products Table</h2>
            <table border={1} cellPadding={5}>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Description</th>
                        <th>Product Price</th>
                        <th>Product Stock</th>
                        <th>Product Image</th>
                        <th>Category</th>
                        <th>Actions</th>
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
                            <td>
                                <button onClick={() => navigate(`/vendor/product/${p.productId}`)}>EDIT</button>
                                <button onClick={() => {handleDelete(p.productId)}}>DELETE</button>
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
            <button onClick={() => navigate("/vendor/dashboard")}>BACK</button>
        </div>
    );
};

export default ViewMyProducts;