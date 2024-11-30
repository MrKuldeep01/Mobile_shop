import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

/*name,
gmail,
mobile,
gender,
address,
image
*/
function Profile() {
  const userData = useSelector((state) => state);
 
  // const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
    if (!userData) {
    setErr("You are fake !");
    console.log("You are fake! user data not found");
    // window.location.href = "/"
  } else {
    console.log(userData);
  }
  return err ? (
    <div className="text-center my-8 sm:mt-6">
      <h1 className="font-semibold m-40 text-6xl text-amber-950"> {err} </h1>
    </div>
  ) : (
    <div className="container max-w-md mx-auto w-full md:w-3/4 lg:w-1/3">
      <div className="hero max-w-[90%] justify-center items-center mx-auto my-6 bg-zinc-300/10 px-8 sm:px-14 py-4 sm:py-8 md:py-14 rounded-3xl shadow-2xl">
        <div className="text-center my-8 sm:mt-6">
          <h1 className="font-thin text-4xl text-amber-950">Profile</h1>
        </div>

        <div className="profile-image mb-8 flex justify-center">
          <img
            src={userData.image}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-amber-900"
          />
        </div>
        {err && (
          <p
            role="alert"
            className="py-2 px-4 bg-white/70 text-red-700 font-semibold text-base my-2 rounded-md"
          >
            {err}
          </p>
        )}
        <div className="profile-details space-y-4">
          <div className="detail-item">
            <label className="text-amber-900 font-semibold">Name:</label>
            <p className="p-2 rounded-md bg-white/70 font-semibold text-amber-900">
              {userData.name}
            </p>
          </div>

          <div className="detail-item">
            <label className="text-amber-900 font-semibold">Email:</label>
            <p className="p-2 rounded-md bg-white/70 font-semibold text-amber-900">
              {userData.gmail}
            </p>
          </div>

          <div className="detail-item">
            <label className="text-amber-900 font-semibold">Phone:</label>
            <p className="p-2 rounded-md bg-white/70 font-semibold text-amber-900">
              {userData.mobile}
            </p>
          </div>

          <div className="detail-item">
            <label className="text-amber-900 font-semibold">Gender:</label>
            <p className="p-2 rounded-md bg-white/70 font-semibold text-amber-900">
              {userData.gender}
            </p>
          </div>

          {/* <div className="detail-item">
            <label className="text-amber-900 font-semibold">Address:</label>
            <p className="p-2 rounded-md bg-white/70 font-semibold text-amber-900">123 Main St, Anytown, USA</p>
          </div> */}
        </div>

        <div className="mt-8">
          <button className="border-2 border-white bg-black text-white py-2 w-full rounded-xl active:bg-white active:text-black font-semibold active:scale-[1.02]">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
