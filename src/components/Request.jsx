import { useEffect ,useState} from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestslice";

const Request=()=>{
    const requests=useSelector((store)=>store.requests);
    const dispatch=useDispatch();
    const [toast,settoast]=useState(false);

    const reviewRequest=async(status,_id)=>{
        const res=await axios.post(BASE_URL+"/request/review/" + status + "/" + _id,{},{withCredentials:true});
        settoast(true);
        setInterval(()=>{
            settoast(false);
        },3000);
        dispatch(removeRequest(_id));

    }
    const Allrequest=async()=>{
        const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
        dispatch(addRequest(res.data.data));
    }
    useEffect(()=>{
       Allrequest();
    },[])

    if (!requests) 
        return;
    if (requests.length === 0) return <h1> No requests Found</h1>;

    return (
        <div className="text-center my-20">
          <h1 className="text-bold text-white text-3xl">Your requests</h1>
    
          {requests.map((request) => {
            const { _id, firstName, SecondName, PhotoUrl, age, gender, about } =
              request.fromUserId;
    
            return (
              <div
                key={_id}
                className="flex m-4 p-4 justify-between items-center rounded-lg bg-base-300 w-1/2 mx-auto"
              >
                <div>
                  <img
                    alt="photo"
                    className="w-20 h-20 rounded-full object-cover"
                    src={PhotoUrl}
                  />
                </div>
                <div className="text-left mx-4 ">
                  <h2 className="font-bold text-xl">
                    {firstName + " " + SecondName}
                  </h2>
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <p>{about}</p>
                </div>
                <div className="card-actions justify-center my-2 p-2">
                    <button className="btn btn-secondary" onClick={()=>reviewRequest("accepted",request.fromUserId._id)}>Accepted</button>
                </div>
                <div className="card-actions justify-center my-2 p-2">
                   <button className="btn btn-primary" onClick={()=>reviewRequest("rejected",request.fromUserId._id)}>Rejected</button>
                </div>
                {toast && 
                        <div className="toast toast-top toast-center">
                        <div className="alert alert-success">
                        <span>Profile accepted suceefullly</span>
                                                </div>
                                                </div>}
              </div>
            );
          })}
        </div>
      );
    };
export default Request;