import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../services/categoryService";
import { addProduct } from "../../services/productService";

function ProductAddForm(){

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState({
        productName : "",
        productDescription : "",
        productPrice : "",
        productStock : "",
        productImageUrl : "",
        categoryId : ""
    });
    
    useEffect(() => {
    const loadCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (err) {
            console.error("Could not load categories. Are you sure the vendor has permission?", err);
        }
    };
    loadCategories();
    }, []); 

    const handleChange = (e) => {
        setProducts({
            ...products,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const payload = {
                ...products,
                category: {
                   categoryId : products.categoryId
                },
                vendor : {
                    userId : localStorage.getItem("userId")
                }
            };
            await addProduct(payload);
            alert("Product added succesfully!");
            navigate("/vendor/products");
        }catch(err){
            alert("Product Add Failed!");
            console.error(err);
        }
    }

return (
    <div>
        <h2>Product Add Form</h2>
        <form onSubmit={handleSubmit}>
            Product Name : <input 
            name="productName"
            value={products.productName}
            placeholder="Enter Product name..."
            onChange={handleChange}
            required/><br/><br/>

            Product Description : <textarea
            name="productDescription"
            value={products.productDescription}
            placeholder="Enter Product Description..."
            onChange={handleChange}
            required/><br/><br/>

            Product Price : <input
            name="productPrice"
            value={products.productPrice}
            placeholder="Enter Product Price...."
            onChange={handleChange}
            required /><br/><br/>

            Product Stock : <input
            name="productStock"
            value={products.productStock}
            placeholder="Enter Product Stock...."
            onChange={handleChange}
            required/><br/><br/>

            Product Image : <input
            name="productImageUrl"
            value={products.productImageUrl}
            placeholder="Enter Image URL...."
            onChange={handleChange}
            required/><br/><br/>

            Category : <select name="categoryId" 
            value={products.categoryId} 
            onChange={handleChange}
            required>
                <option value="" disabled>--Select Category</option>
                {categories.map(c => (
                    <option key={c.categoryId} value={c.categoryId}>
                        {c.categoryName}
                    </option>
                ))}
            </select><br/><br/>

            <button type="submit">SAVE PRODUCT</button>
        </form>
        <button onClick={() => navigate("/vendor/dashboard")}>BACK</button>
    </div>
);
};

export default ProductAddForm;