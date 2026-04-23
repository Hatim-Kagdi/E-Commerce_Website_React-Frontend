const BASE_URL = "http://localhost:8080";

export const apiRequest = async (endpoint ,method = "GET", body = null) =>{
    const token = localStorage.getItem("token");

    const options = {
        method,
        headers : {
            "Content-Type" : "application/json",
        }
    };

    if(token){
        options.headers["Authorization"] = `Bearer ${token}`;
    }

    if(body){
        options.body = JSON.stringify(body);
    }

    const resp = await fetch(`${BASE_URL}${endpoint}`, options);

    if(!resp.ok){
        const text = await resp.text();
        console.error("Backend error:", text);
        throw new Error(text || "Request Failed");
    }

    if(resp.status === 204){
        return null;
    }

    return resp.json();
}