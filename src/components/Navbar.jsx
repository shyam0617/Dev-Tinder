import { useDispatch, useSelector } from "react-redux";
const Navbar =()=>{
  const user = useSelector((store) => store.user);
    return (
<div className="navbar bg-base-200">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">DevApplication</a>
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
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    )
}
export default Navbar;