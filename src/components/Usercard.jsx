import { useDispatch,useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import {removeFeed } from "../utils/feedSlice";

const Usercard=({user})=>{
  const requests=useSelector((store)=>store.feed);
  const dispatch=useDispatch();
  const {_id,firstName,SecondName,about,age,PhotoUrl}=user;

  const handlerequest=async(status,_id)=>{
  const res=await axios.post((BASE_URL+"/request"+"/send"+"/"+status +"/"+ _id),{},{withCredentials:true});
  //console.log(res.data.data.toUserId);
  dispatch(removeFeed(res.data.data.toUserId));
  }
    return(
<div className="card bg-base-300 w-96 shadow-xl h-[600px]">
  <figure className="h-[300px] flex justify-center items-center">
    <img
      src={PhotoUrl}
      alt="Shoes"
      className="max-h-full w-auto"
    />
  </figure>
  <div className="card-body flex flex-col justify-between">
    <h2 className="card-title">{firstName}</h2>
    <p>About: {about}</p>
    <p>age :{age || 50}</p>
    <div className="card-actions justify-center my-2 p-2">
      <button className="btn btn-secondary " onClick={()=>{
        handlerequest("interested",_id);
      }}>Interested</button>
      <button className="btn btn-primary" onClick={()=>{
        handlerequest("ignored",_id);
      }}>Ignore</button>
    </div>
  </div>
</div>
    )
}
export default Usercard;