import axios from "axios";
import { useState} from "react";
import {useDispatch}from "react-redux";
import { addUser } from "../utils/userSlice";
import {useNavigate } from "react-router-dom";
import {BASE_URL} from "../utils/constants";
import { Link } from "react-router-dom";

const Login=()=>{

    const [EmailId,setEmailId]=useState("");
    const [Password,setPassword]=useState("");
    const [loginmessage,setloginmessage]=useState("");

    const dispatch=useDispatch();
    const navigate=useNavigate();
   
    const handleLogin= async()=>{
        try{
            const res= await axios.post(
                BASE_URL+"/loginuser",
                {
                EmailId,
                Password,
                },
            {withCredentials:true});//to have cookie in application
            //console.log(res.data);
            dispatch(addUser(res.data));
            return navigate("/Feed");
        }
        catch(err)
        {   
            setloginmessage(err?.response?.data || "Error ! Provide valid details");
            console.error(err);
        }  
    }

return(
<div className="flex justify-center my-20">
<div className="card bg-base-300 w-96 shadow-xl">
    <div className="card-body flex items-center justify-center">
        <h2 className="card-title ">LOGIN</h2>
        <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Email Id </span>
                </div>

                <input type="text" 
                value={EmailId} 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setEmailId(e.target.value)} />

                <div className="label">
                    <span className="label-text">Password</span>
                </div>

                <input type="text" 
                value={Password} 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setPassword(e.target.value)} />

        </label>
        <p className="text-red-500">{loginmessage}</p>
        <div className="card-actions justify-center">
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
        <p>Dont have an Account? <Link to="/SignUp">SignUp</Link></p>
    </div>
</div>
</div>
    )
}
export default Login;
