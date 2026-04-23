import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate = useNavigate();

    const[user, setUser] = useState({
        userName : "",
        userPassword : "",
        userEmail : "",
        userMobileNumber : "",
        userAddress : "",
        userBirthDate : "",
        role : ""
    });

    const handleChange = (e) =>{
        setUser({
            ...user,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const res = await fetch("http://localhost:8080/auth/register" , 
            {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(user)
            }
        );

        if(res.ok){
            alert("Registration Succesfull!");
            navigate("/login");
        }else{
            alert("Registration Failed!");
        }
    };

    return (
        <div>
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                Name : <input
                type="text"
                name="userName"
                placeholder="Enter Name..."
                value={user.userName}
                onChange={handleChange}
                required/> <br/><br/>

                Email : <input
                type="email"
                name="userEmail"
                placeholder="Enter Email..."
                value={user.userEmail}
                onChange={handleChange}
                required/><br/><br/>

                PassWord : <input
                type="text"
                name="userPassword"
                placeholder="ENter Password..."
                value={user.userPassword}
                onChange={handleChange}
                required/><br/><br/>

                Mobile Number : <input
                type="number"
                name="userMobileNumber"
                placeholder="Enter Mobile Number"
                onChange={handleChange}
                required/><br/><br/>

                Address : <textarea
                name="userAddress"
                placeholder="Enter Address..."
                value={user.userAddress}
                onChange={handleChange}
                required/><br/><br/>

                Birth-Date : <input
                type="date"
                name="userBirthDate"
                value={user.userBirthDate}
                onChange={handleChange}
                required/><br/><br/>

                Role : <select name="role" value={user.role} onChange={handleChange} required>
                    <option disabled value="">--Select Option</option>
                    <option value="ROLE_CUSTOMER">Customer</option>
                    <option value="ROLE_VENDOR">Vendor</option>
                </select><br/><br/>

                <button type="submit">REGISTER</button>
            </form>
        </div>
    );
}

export default Register;