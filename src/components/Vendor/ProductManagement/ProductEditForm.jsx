import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../../services/productService";
import { getAllCategories } from "../../../services/categoryService";

function ProductEditForm(){

const { productId } = useParams();
const navigate = useNavigate();
const [categories , setCategories] = useState([]);
const [imageFile, setImageFile] = useState(null);
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

const handleImageUpload = (e) =>{
    setImageFile(e.target.files[0]);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try{

        const payload = {
            productName: product.productName,
            productDescription: product.productDescription,
            productPrice: product.productPrice,
            productStock: product.productStock,
            productImageUrl: product.productImageUrl,
            category : {categoryId : product.categoryId},
            vendor : {userId : localStorage.getItem("userId")}
        };
        formData.append("product" , JSON.stringify(payload));
        if(imageFile){
            formData.append("image", imageFile);
        }
        await updateProduct(productId, formData);
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
            onChange={handleChange}
            /><br/><br/>

            Product Description : <textarea
            name="productDescription"
            value={product.productDescription}
            onChange={handleChange}
            /><br/><br/>

            Product Price : <input
            name="productPrice"
            value={product.productPrice}
            onChange={handleChange}
             /><br/><br/>

            Product Stock : <input
            name="productStock"
            value={product.productStock}
            onChange={handleChange}
            /><br/><br/>

            <div style={{ marginBottom: "15px" }}>
            <p>Current Product Image:</p>
            {product.productImageUrl ? (
            <img 
            src={`http://localhost:8080/uploads/${product.productImageUrl}`} 
            alt="Current" 
            style={{ width: "100px", height: "100px", borderRadius: "8px", border: "1px solid #ccc" }} 
            />
            ) : (
            <span>No image uploaded</span>
            )}
            </div>

            {/* The File Input - Remove 'required' so they can skip it */}
            New Image (Optional): <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload} 
            /><br/><br/>

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


