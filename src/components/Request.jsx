// import { useEffect ,useState} from "react";
// import { BASE_URL } from "../utils/constants";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { addRequest, removeRequest } from "../utils/requestslice";

// const Request=()=>{
//     const requests=useSelector((store)=>store.requests);
//     let temp=false;
//     const dispatch=useDispatch();
//     const [toast,settoast]=useState(false);
//     const [isFetched, setIsFetched] = useState(false);

//     const reviewRequest=async(status,_id)=>{
//         const res=await axios.post(BASE_URL+"/request/review/" + status + "/" + _id,{},{withCredentials:true});
//         settoast(true);
//         setTimeout(()=>{
//             settoast(false);
//         },3000);
//         dispatch(removeRequest(_id));

//     }
//     const Allrequest=async()=>{
//       try {
//         const res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
//         dispatch(addRequest(res.data.data));
//     } catch (error) {
//         console.error("Error fetching requests:", error);
//     }
//     finally {
//       setIsFetched(true); // API call completed
//   }
//     }
//     useEffect(()=>{
//        Allrequest();
//     },[])
  
//     // if (!requests) 
//     // {   
//     //     return <h1 className="text-center my-20 text-white text-3xl">Requests are not found</h1>;
//     // }
//     if(!requests|| requests.length === 0) 
//     { 
//       return (<h1> No requests Found</h1>)
//     }

//     return (
//         <div className="text-center my-20">
//           <h1 className="text-bold text-white text-3xl">Your requests</h1>
    
//           {requests.map((request) => {
//             const { _id, firstName, SecondName, PhotoUrl, age, gender, about } =
//               request.fromUserId;
    
//             return (
//               <div
//                 key={_id}
//                 className="flex m-4 p-4 justify-between items-center rounded-lg bg-base-300 w-1/2 mx-auto"
//               >
//                 <div>
//                   <img
//                     alt="photo"
//                     className="w-20 h-20 rounded-full object-cover"
//                     src={PhotoUrl}
//                   />
//                 </div>
//                 <div className="text-left mx-4 ">
//                   <h2 className="font-bold text-xl">
//                     {firstName + " " + SecondName}
//                   </h2>
//                   {age && gender && <p>{age + ", " + gender}</p>}
//                   <p>{about}</p>
//                 </div>
//                 <div className="card-actions justify-center my-2 p-2">
//                     <button className="btn btn-secondary" onClick={()=>reviewRequest("accepted",request.fromUserId._id)}>Accepted</button>
//                 </div>
//                 <div className="card-actions justify-center my-2 p-2">
//                    <button className="btn btn-primary" onClick={()=>reviewRequest("rejected",request.fromUserId._id)}>Rejected</button>
//                 </div>
//                 {toast && 
//                         <div className="toast toast-top toast-center">
//                         <div className="alert alert-success">
//                         <span>Profile accepted suceefullly</span>
//                                                 </div>
//                                                 </div>}
//               </div>
//             );
//           })}
//         </div>
//       );
//     };
// export default Request;
/*************************************chgat */
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestslice";

const Request = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    
    const [toast, setToast] = useState(false);

    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, { withCredentials: true });
            setToast(true);
            setTimeout(() => setToast(false), 3000);
            dispatch(removeRequest(_id));
        } catch (error) {
            console.error("Error reviewing request:", error);
        }
    };

    const Allrequest = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
            if (res.data.data.length === 0) {
                setNoRequests(true); // If no data, set noRequests to true
            } else {
                setNoRequests(false);
                dispatch(addRequest(res.data.data));
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
            setNoRequests(true); // If an error occurs, assume no requests
        }
    };

    useEffect(() => {
        Allrequest();
    }, []);

    // if (noRequests) {
    //     return <h1 className="text-center my-20 text-white text-3xl">Requests are not found</h1>;
    // }

    if (!requests || requests.length === 0) {
        return <h1 className="text-center my-20 text-white text-3xl">No requests found</h1>;
    }

    return (
        <div className="text-center my-20">
            <h1 className="font-bold text-white text-3xl">Your Requests</h1>

            {requests.map((request) => {
                const { _id, firstName, SecondName, PhotoUrl, age, gender, about } = request.fromUserId;

                return (
                    <div
                        key={_id}
                        className="flex m-4 p-4 justify-between items-center rounded-lg bg-base-300 w-1/2 mx-auto"
                    >
                        <div>
                            <img alt="photo" className="w-20 h-20 rounded-full object-cover" src={PhotoUrl} />
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">{firstName + " " + SecondName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div className="card-actions justify-center my-2 p-2">
                            <button className="btn btn-secondary" onClick={() => reviewRequest("accepted", request.fromUserId._id)}>
                                Accept
                            </button>
                        </div>
                        <div className="card-actions justify-center my-2 p-2">
                            <button className="btn btn-primary" onClick={() => reviewRequest("rejected", request.fromUserId._id)}>
                                Reject
                            </button>
                        </div>
                    </div>
                );
            })}

            {toast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile accepted successfully</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Request;
