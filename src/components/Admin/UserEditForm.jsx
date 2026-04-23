import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../services/userService";

function UserEditForm(){
const { id } = useParams();
const navigate = useNavigate();

const [user, setUser] = useState({
    userName : "",
    userEmail : "",
    userMobileNumber : "",
    userAddress : "",
    userBirthDate : ""
});

useEffect(() => {
    getUserById(id)
        .then(data => setUser(data))
        .catch(err => console.error(err));
}, [id]);

const handleChange = (e) =>{
    setUser({
        ...user,
        [e.target.name] : e.target.value
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await updateUser(id, user);
        alert("User updated successfully!");
        navigate("/admin/users");
    } catch (err) {
        console.error(err);
        alert("Update failed!");
    }
};

return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", border:"1px solid" }}>
        <h2>Edit User</h2>
       
        <form onSubmit={handleSubmit}>
        Name : 
        <input name="userName" 
        value = {user.userName}
        onChange={handleChange}
        /><br/><br/>
        Email : 
        <input name="userEmail"
        value={user.userEmail}
        onChange={handleChange}/>
        <br/><br/>
        Mobile Number : 
        <input name="userMobileNumber"
        value={user.userMobileNumber}
        onChange={handleChange}/>
        <br/><br/>
        
        Address : 
        <input name="userAddress"
        value={user.userAddress}
        onChange={handleChange}/><br/><br/>

        BirthDate : 
        <input type="date" name="userBirthDate"
        value={user.userBirthDate}
        onChange={handleChange}/><br/><br/>

        <button type="submit">Update</button>
        </form>

    </div>
    </div>
);
}

export default UserEditForm;