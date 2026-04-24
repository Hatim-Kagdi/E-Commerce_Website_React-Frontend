import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById, updateCategory } from "../../../services/categoryService";

function CategoryEditForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        categoryName : "",
        categoryDescription : ""
    });

    useEffect(() => {
        getCategoryById(id)
        .then(data => setCategory(data))
        .catch(err => console.error(err));
    },[ id ]);

    const handleChange = (e) => {
        setCategory({
            ...category,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await updateCategory(id, category);
            alert("Category Updated Succesfully!");
            navigate("/admin/categories");
        }catch(err){
            alert("Category not updated!");
            console.error(err);
        }
    };
return (
    <div>
        <h2>Category Edit Form</h2>
        <form onSubmit={handleSubmit}>
            Category Name : <input
            name="categoryName"
            value={category.categoryName}
            onChange={handleChange}
            /><br/><br/>

            Category Description : <textarea
            name="categoryDescription"
            value={category.categoryDescription}
            onChange={handleChange}
            /><br/><br/>

            <button type="submit">SUBMIT</button>

        </form><br/><br/>
        <button onClick={() => navigate("/admin/categories")}>BACK</button>
    </div>
);
};

export default CategoryEditForm;