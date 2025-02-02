import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { Link } from "react-router-dom";
const Navbar =()=>{
  const user = useSelector((store) => store.user);
  const Navigate=useNavigate();
  const dispatch=useDispatch();

  const handleLogout=async()=>{
     try{
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
      dispatch(removeUser(user));
      return Navigate("/login");
     }
     catch(err)
     {
       console.log(err);
     }
     
  }
    return (
<div className="navbar bg-base-200 fixed top-0 z-50">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevApplication</Link>
  </div>
  <div className="flex-none gap-2">
    {user && (<div><p>Welcome {user.firstName}</p></div>)}
    <div className="dropdown dropdown-end mx-5">
      { user && (
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar flex">
        <div className="w-10 rounded-full">
          <img
            alt="users photo"
            src={user.PhotoUrl}/>
        </div>
      </div>)}
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link  to="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        <li>
          <Link  to="/feed" className="justify-between">
            feed
          </Link>
        </li>
        <li>
         <Link to="/connections" className="text-center">Connections</Link>
        </li>
        <li>
         <Link to="/requests" className="text-center">Requests</Link>
        </li>
        <li>
        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  </div>
</div>
    )
}
export default Navbar;