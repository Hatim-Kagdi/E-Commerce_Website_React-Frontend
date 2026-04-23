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
}

useEffect(() => { fetchCatgories();} , []);

const handleDelete = async (id) => {
    if(window.confirm("Delete this Category?"));
    await deleteCategory(id);
    fetchCatgories();
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
                {category.map(c =>(
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
                ))}
            </tbody>
        </table><br/>
        <button onClick={() =>  navigate("/admin/dashboard")}>BACK</button>
    </div>
);

};


export default ViewAllCategories;