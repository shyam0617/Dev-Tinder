import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import Usercard from "./Usercard";

const Feed=()=>{
    const feed=useSelector((store)=>store.feed);
    const dispatch=useDispatch();
    const getFeed=async()=>{
        if(feed)return;
        try{
        const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});
        //console.log(res.data.data);
        if(res?.data?.data.length!=0)
        dispatch(addFeed(res.data.data));
        }
        catch(err)
        {
            console.error(err);
        }    
    }
    useEffect(()=>{
     getFeed();
    },[]);
    return (
        feed && feed.length!=0 && (
        <div className="flex justify-center my-20">
             <Usercard user={feed[0]}/>
        </div>)
    )
}
export default Feed;