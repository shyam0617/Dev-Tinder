const Usercard=({user})=>{
  const {firstName,SecondName,about,age,PhotoUrl}=user;
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
      <button className="btn btn-secondary">Interested</button>
      <button className="btn btn-primary">Ignore</button>
    </div>
  </div>
</div>
    )
}
export default Usercard;