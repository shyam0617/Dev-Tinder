import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Profile=()=>{
    const [firstName,setfirstName]=useState("");
    const [SecondName,setsecondName]=useState("");
    const [skills,setSkills]=useState([]);
    const [PhotoUrl,setPhotoUrl]=useState("");
    const [editmessage,seteditmessage]=useState("");

    const handleedit=async()=>{
        try{
            const res=await axios.patch(BASE_URL+"/profile/edit",
            {
               firstName,
               SecondName,
               skills,
               PhotoUrl

            },{withCredentials:true});
            console.log(res);
        }
        catch(err)
        {   seteditmessage("enter all fields");
            console.log(err);
        }    
    }
    return(
        <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body flex items-center justify-center">
                <h2 className="card-title ">Edit Profile</h2>
                <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">firstName </span>
                        </div>
                        <input type="text" 
                        value={firstName} 
                        className="input input-bordered w-full max-w-xs"onChange={(e)=>setfirstName(e.target.value)}
                        />
                        <div className="label">
                            <span className="label-text">SecondName</span>
                        </div>
                        <input type="text" 
                        value={SecondName} 
                        className="input input-bordered w-full max-w-xs"onChange={(e)=>setsecondName(e.target.value)}
                        />
                        <div className="label">
                            <span className="label-text">skills</span>
                        </div>
                        <input type="text" 
                        value={skills} 
                        className="input input-bordered w-full max-w-xs" onChange={(e)=>setSkills(e.target.value)}
                        />
                        <div className="label">
                            <span className="label-text">PhotoUrl</span>
                        </div>
                        <input type="text" 
                        value={PhotoUrl} 
                        className="input input-bordered w-full max-w-xs" onChange={(e)=>setPhotoUrl(e.target.value)}
                        />
        
                </label>
                <p className="text-red-500">{editmessage}</p>
                <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={handleedit}>Submit</button>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Profile;
