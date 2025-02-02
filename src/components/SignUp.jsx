import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch ,useSelector} from "react-redux";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const SignUp=()=>{
    const [Email,setEmailId]=useState("");
    const [Password,setPassword]=useState("");
    const [gender,setgender]=useState("");
    const [firstName,setfirstName]=useState("");
    const [SecondName,setSecondName]=useState("");
    const [signupmessgae,setsignupmessage]=useState("");

    const feed=useSelector((store)=>store.feed);
    const dispatch=useDispatch();
    const navigate=useNavigate();


    const handlecreate=async()=>{
        console.log("ahi");
        try{
            const res=await axios.post(BASE_URL+"/signup",
                {
                    firstName,SecondName,Email,gender,Password
                },{
                    withCredentials:true
                }
            )
            dispatch(addUser(res.data.data));
            return navigate("/profile");
        }
        catch(err)
        {
            setsignupmessage(err.response|| "provide valid details");
        }
    
    }
return(
<div className="flex justify-center my-20">
<div className="card bg-base-300 w-96 shadow-xl">
    <div className="card-body flex items-center justify-center">
        <h2 className="card-title ">SignUp</h2>
        <p className="text-red-500">{signupmessgae}</p>
        <label className="form-control w-full max-w-xs">
        <div className="label">
                    <span className="label-text">firstName</span>
                </div>

                <input type="text" 
                value={firstName} 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setfirstName(e.target.value)} />
                 <div className="label">
                    <span className="label-text">SecondName</span>
                </div>
          
                <input type="text" 
                value={SecondName} 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setSecondName(e.target.value)} />
                <div className="label">
                    <span className="label-text">EmailId</span>
                </div>

                <input type="Password" 
                value={Email} 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setEmailId(e.target.value)} />

                <div className="label">
                    <span className="label-text">Password</span>
                </div>

                <input type="text" 
                value={Password} 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setPassword(e.target.value)} />

                 <div className="label">
                    <span className="label-text">gender</span>
                </div>

                <input type="text" 
                value={gender} 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setgender(e.target.value)} />

        </label>
        <div className="card-actions justify-center">
        <button className="btn btn-primary" onClick={handlecreate}>Creaete account</button>
        </div>
        <p>Alreday created ? <Link to="/login">  login</Link></p>
    </div>
</div>
</div>
    )
};
export default SignUp;
