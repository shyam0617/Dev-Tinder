import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch ,useSelector} from "react-redux";
import { addFeed } from "../utils/feedSlice";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp=()=>{
    const [Email,setEmailId]=useState("");
    const [Password,setPassword]=useState("");
    const [age,setage]=useState("");
    const [gender,setgender]=useState("");
    const [firstName,setfirstName]=useState("");
    const [SecondName,setSecondName]=useState("");
    const [PhotoUrl,setPhotoUrl]=useState("");
    const [skills,setSkills]=useState([]);
    const [about,setabout]=useState("");
    const [signupmessgae,setsignupmessage]=useState("");

    const feed=useSelector((store)=>store.feed);
    const dispatch=useDispatch();
    const navigate=useNavigate();


    const handlecreate=async()=>{
        try{
            const res=await axios.post(BASE_URL+"/signup",
                {
                    firstName,SecondName,Email,age,gender,skills,PhotoUrl,about,Password
                },{
                    withCredentials:true
                }
            )
            dispatch(addFeed(res.data.data));
            return navigate("/login");
        }
        catch(err)
        {
            setsignupmessage(err.response.config.data || "provide valid details");
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

                <input type="text" 
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
                    <span className="label-text">Skills</span>
                </div>

                <input type="text" 
                value={skills} 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setSkills(e.target.value)} />

                 <div className="label">
                    <span className="label-text">about</span>
                </div>

                <input type="text" 
                value={about} 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setabout(e.target.value)} />

                <div className="label">
                    <span className="label-text">age</span>
                </div>

                <input type="text" 
                value={age} 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setage(e.target.value)} />
                 <div className="label">
                    <span className="label-text">gender</span>
                </div>

                <input type="text" 
                value={gender} 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setgender(e.target.value)} />

<               div className="label">
                    <span className="label-text">PhotoUrl</span>
                </div>

                <input type="text" 
                value={PhotoUrl} 
                className="input input-bordered w-full max-w-xs"
                onChange={(e)=>setPhotoUrl(e.target.value)} />

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
