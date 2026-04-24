import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/auth/login";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    let url = BASE_URL;

    const handleLogin = async (e) =>{
        e.preventDefault();

        const response = await fetch(url, {
            method:"POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({email, password})
        }
        );

        const data = await response.json();

        if(response.ok){
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("userId" , data.userId);

            if(data.role === "ROLE_ADMIN"){
                navigate("/admin/dashboard");
            }else if(data.role === "ROLE_VENDOR"){
                navigate("/vendor/dashboard");
            }else if(data.role === "ROLE_CUSTOMER"){
                navigate("/customer/dashboard");
            }
        }else{
            alert("Login Failed!");
        }
    };
    return (
        <div>
            <h2>LOGIN FORM</h2>
            <form onSubmit={handleLogin}>
                Email : <input 
                placeholder="Enter Email...."
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
                <br/><br/>
                Password :
                <input
                placeholder="Enter Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /><br/><br/>

                <button type="submit">LOGIN</button><br/><br/>

                <button onClick={() => navigate("/register")}> New User Register Here</button>

            </form>
        </div>
    );
}

export default Login;