import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import Usercard from "./Usercard";
import { useNavigate } from "react-router-dom";

const EditProfile=({user})=>{
    const [firstName,setfirstName]=useState(user.firstName);
    const [SecondName,setsecondName]=useState(user.SecondName);
    const [about,setabout]=useState(user.about);
    const [PhotoUrl,setPhotoUrl]=useState(user.PhotoUrl);
    const [editmessage,seteditmessage]=useState("");
    const [age,setage]=useState(user.age);
    const navigate=useNavigate();
    const [toast,setToast]=useState(false);

    const handleedit=async()=>{
        try{
            const res=await axios.patch(BASE_URL+"/profile/edit",
            {
               firstName,
               SecondName,
               about,
               age,
               PhotoUrl

            },{withCredentials:true});
            //console.log(res);
            setToast(true);
            setInterval(()=>{
                setToast(false);
            },3000);
            
        }
        catch(err)
        {   
            seteditmessage("enter all fields");
            console.log(err);
        }    
    }
    return(
        <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-xl h-300">
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
                            <span className="label-text">age</span>
                        </div>
                        <input type="text" 
                        value={age} 
                        className="input input-bordered w-full max-w-xs"onChange={(e)=>setage(e.target.value)}
                        />
                        <div className="label">
                            <span className="label-text">skills</span>
                        </div>
                        <input type="text" 
                        value={about} 
                        className="input input-bordered w-full max-w-xs" onChange={(e)=>setabout(e.target.value)}
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
                <div className="pl-2">
                <Usercard user={{firstName,age,PhotoUrl,SecondName,about}}/>
                </div>
                        {toast && 
                        <div className="toast toast-top toast-center">
                        <div className="alert alert-success">
                        <span>Profile saved suceefullly</span>
                                                </div>
                                                </div>}
        </div>
    )
}
export default EditProfile;
