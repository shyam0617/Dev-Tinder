import axios from "axios";
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { BASE_URL } from "../utils/constants"
import { addUser } from "../utils/userSlice"
import { useEffect} from "react"
import {useDispatch, useSelector}from "react-redux";
import { useNavigate } from "react-router-dom";

const Body=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((store)=>store.user);
    const fetchuser= async()=>{
        if(user)
            return;
        try{
            const res=await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
            dispatch(addUser(res.data));
        }
        catch(err)
        {   
            if(err.status===401 || err.status===400)
            {
                return navigate("/Login");
            }   
        }
    };
     useEffect(()=>{
      fetchuser();
     },[]);
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}
export default Body;

