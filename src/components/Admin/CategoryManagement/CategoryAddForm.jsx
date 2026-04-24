import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../../services/categoryService";

function CategoryAddForm(){
const [category, setCategory] = useState({
    categoryName : "",
    categoryDescription : ""
});
const navigate = useNavigate();

const handleChange = (e) => {
    setCategory({
        ...category,
        [e.target.name] : e.target.value
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
try{
    await addCategory(category);
    alert("Category Added Successfully!");
        navigate("/admin/categories");
} catch(err){
 alert("Category not added!");
}
};

return (
    <div>
        <h2>Add New Category Form</h2>
        <form onSubmit={handleSubmit}>
            Category Name : <input
            name="categoryName"
            placeholder="Enter Category Name..."
            value={category.categoryName}
            onChange={handleChange}
            required/><br/><br/>

            Category Description :
            <textarea 
            name="categoryDescription"
            placeholder="Enter Category Description..."
            value={category.categoryDescription}
            onChange={handleChange}
            required/><br/><br/>

            <button type="submit">ADD CATEGORY</button>
        </form><br/><br/>

        <button onClick={() => navigate("/admin/dashboard")}>BACK</button>
    </div>
);
};

export default CategoryAddForm;