import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/productService";
import { getAllCategories } from "../../services/categoryService";

function ProductEditForm(){

const { productId } = useParams();
const navigate = useNavigate();
const [categories , setCategories] = useState([]);
const [product , setProduct] = useState({
    productName : "",
    productDescription :"",
    productPrice : "",
    productStock : "",
    productImageUrl : "",
    categoryId : ""
});

useEffect(() => {
        const loadData = async () => {
            try {

                // 1. Fetch categories first (we need them to find the ID)
            const categoriesData = await getAllCategories();
            setCategories(categoriesData);

            // 2. Fetch product
            const productData = await getProductById(productId);

            // 3. Find the ID by matching the categoryName
            const matchedCategory = categoriesData.find(
                (c) => c.categoryName === productData.categoryName
            );
                // Important: Extract the categoryId from the object so the dropdown matches
              setProduct({
                ...productData,
                // Set the ID if found, otherwise keep it empty
                categoryId: matchedCategory ? matchedCategory.categoryId : ""
            });
            } catch (err) {
                console.error("Load failed", err);
            }
        };
        loadData();
    }, [productId]);

const handleChange = (e) =>{
    setProduct({
        ...product,
        [e.target.name] : e.target.value
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try{

        const payload = {
            ...product,
            category : {categoryId : product.categoryId},
            vendor : {userId : localStorage.getItem("userId")}
        };
        await updateProduct(productId, payload);
        alert("Product Data Updated!");
        navigate("/vendor/products");
    }catch(err){
        console.error(err);
        alert("Product Data Update Failed!");
    }
};

return (
    <div>
        <h2>PRODUCT EDIT FORM</h2>
        <form onSubmit={handleSubmit}>
            Product Name : <input 
            name="productName"
            value={product.productName}
            placeholder="Enter Product name..."
            onChange={handleChange}
            required/><br/><br/>

            Product Description : <textarea
            name="productDescription"
            value={product.productDescription}
            placeholder="Enter Product Description..."
            onChange={handleChange}
            required/><br/><br/>

            Product Price : <input
            name="productPrice"
            value={product.productPrice}
            placeholder="Enter Product Price...."
            onChange={handleChange}
            required /><br/><br/>

            Product Stock : <input
            name="productStock"
            value={product.productStock}
            placeholder="Enter Product Stock...."
            onChange={handleChange}
            required/><br/><br/>

            Product Image : <input
            name="productImageUrl"
            value={product.productImageUrl}
            placeholder="Enter Image URL...."
            onChange={handleChange}
            required/><br/><br/>

            Category : <select name="categoryId" 
            value={product.categoryId} 
            onChange={handleChange}
            required>
                <option value="" disabled>--Select Category</option>
                {categories.map(c => (
                    <option key={c.categoryId} value={c.categoryId}>
                        {c.categoryName}
                    </option>
                ))}
            </select><br/><br/>

            <button type="submit">UPDATE PRODUCT</button>
        </form>
        <button onClick={() => navigate("/vendor/products")}>BACK</button>
    </div>
);
};

export default ProductEditForm;


