
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
            const res=await axios.post(BASE_URL+"/request/review/" +status+ "/" + _id,{},{withCredentials:true});
            dispatch(removeRequest(_id));
            setToast(true);
            setTimeout(() => setToast(false), 3000);
           
        } catch (error) {
            console.error("Error reviewing request:", error);
        }
    };

    const Allrequest = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
            if(res.data.data.length > 0){
                dispatch(addRequest(res.data.data));
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    useEffect(() => {
        Allrequest();
    }, []);

    // if (noRequests) {
    //     return <h1 className="text-center my-20 text-white text-3xl">Requests are not found</h1>;
    // 
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
                            <button className="btn btn-secondary" onClick={() => reviewRequest("accepted", request._id)}>
                                Accept
                            </button>
                        </div>
                        <div className="card-actions justify-center my-2 p-2">
                            <button className="btn btn-primary" onClick={() => reviewRequest("rejected", request._id)}>
                                Reject
                            </button>
                        </div>
                    </div>
                );
            })}

            {toast && (
                <div className="toast toast-top toast-center my-20">
                    <div className="alert alert-success">
                        <span>Profile updated successfully</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Request;
