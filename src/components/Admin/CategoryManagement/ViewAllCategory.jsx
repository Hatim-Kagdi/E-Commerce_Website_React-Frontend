import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCategory, getAllCategories } from "../../../services/categoryService";

function ViewAllCategories(){
const [category, setCategory] = useState([]);
const navigate = useNavigate();

const fetchCatgories = async () => {
    try{
        const data = await getAllCategories();
        setCategory(data);
    }catch(err){
        console.error(err);
    }
};

useEffect(() => { fetchCatgories();} , []);

const handleDelete = async (id) => {
   const confirmDelete = window.confirm("Are you sure you want to delete this Category?");
    
    if (confirmDelete) {
        try {
            // 1. Wait for the server to finish deleting
            await deleteCategory(id);
            // 2. Alert the user (Optional but good UX)
            alert("Category deleted successfully!");
            // 3. RE-FETCH the data to update the table automatically
            fetchCatgories(); 
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete category");
        }
    }
}
return (
    <div>
        <h2>Category Management Panel</h2>
        <table border={1} cellPadding={5} style={{marginTop:"20px", width:"100%"}}>
            <thead>
                <tr>
                    <th>Category Id</th>
                    <th>Category Name</th>
                    <th>Category Description</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { category.length > 0 ? (
                category.map(c =>(
                    <tr key={c.categoryId}>
                        <td>{c.categoryId}</td>
                        <td>{c.categoryName}</td>
                        <td>{c.categoryDescription}</td>
                        <td>{new Date(c.createdAt).toLocaleString()}</td>
                        <td>{new Date(c.updatedAt).toLocaleString()}</td>
                        <td>
                            <button onClick={() => navigate(`/admin/category/${c.categoryId}`)}>EDIT</button>
                            <button onClick={() => handleDelete(c.categoryId)}>DELETE</button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                    No Categories available at the moment.
                </td>
                </tr>
            )}
            </tbody>
        </table><br/>
        <button onClick={() =>  navigate("/admin/dashboard")}>BACK</button>
    </div>
);

};


export default ViewAllCategories;