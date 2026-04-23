import { useNavigate } from "react-router-dom";

function CategoryEditForm() {

    const navigate = useNavigate();
return (
    <div>
        <h2>Category Edit Form</h2>
        <button onClick={() => navigate("/admin/dashboard")}>BACK</button>
    </div>
);
};

export default CategoryEditForm;