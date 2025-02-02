
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections); // Redux state

  const allConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      if (response.data.data.length > 0) {
        dispatch(addConnections(response.data.data));
      }
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    allConnections();
  }, []);

  //console.log("Current connections:", connections);

  // If connections is undefined or an empty array, show "No Connections Found"
  if (!connections || connections.length === 0) {
    return <h1 className="text-center my-20 text-white text-2xl">No Connections Found</h1>;
  }

  return (
    <div className="text-center my-20 w-full">
      <h1 className="text-bold text-white text-3xl">Your Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, SecondName, PhotoUrl, age, gender, about } = connection;

        return (
          <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img alt="photo" className="w-20 h-20 rounded-full object-cover" src={PhotoUrl} />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">{firstName + " " + SecondName}</h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
