import { useNavigate } from "react-router-dom";

function CategoryAddForm(){
const navigate = useNavigate();

return (
    <div>
        <h2>Add New Category Form</h2>

        <button onClick={() => navigate("/admin/dashboard")}>BACK</button>
    </div>
);
};

export default CategoryAddForm;