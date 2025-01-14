import axios from "axios";
import { useState } from "react";
const Login=()=>{

    const [emailId,setEmailId]=useState("");
    const [password,setPassword]=useState("");

    const handleLogin= async()=>{
        
        try{
            const user=axios.post("http://localhost:3000/loginuser",{
                emailId,
                password
            },{withCredentials:true});
        }
        catch(err)
        {
            console.error(err);
        }
        
    }

return(
<div className="flex justify-center my-10">
<div className="card bg-base-300 w-96 shadow-xl">
    <div className="card-body flex items-center justify-center">
        <h2 className="card-title ">LOGIN</h2>
        <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Email Id </span>
                </div>

                <input type="text" 
                value={emailId} 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setEmailId(e.target.value)} />

                <div className="label">
                    <span className="label-text">Password</span>
                </div>

                <input type="text" 
                value={password} 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setPassword(e.target.value)} />

        </label>
        <div className="card-actions justify-center">
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
    </div>
</div>
</div>
    )
}
export default Login;
