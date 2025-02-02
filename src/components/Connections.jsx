import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addConnections } from "../utils/connectionSlice";

const Connections=()=>{
    const dispatch=useDispatch();
    const connections=useSelector((store)=>store.connections);
    const allConnections=async()=>{
      try{
        const set= await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
        dispatch(addConnections(set.data.data));
      }
      catch(err)
      {
          
      }
    }
    useEffect(()=>{
        allConnections();
    },[]);
    
    // if (!connections) 
    // {    
    //       return <h1> No Connections Found</h1>;;
    // }
    // if (connections.length === 0) return <h1> No Connections Found</h1>;
    if(!connections || connections.length==0)
      return <h1>No connections found</h1>;

    return (
    <div className="text-center my-20">
      <h1 className="text-bold text-white text-3xl">Your Connections</h1>
    
      {connections.map((connection) => {
        const { _id, firstName, SecondName, PhotoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
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
            <div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;