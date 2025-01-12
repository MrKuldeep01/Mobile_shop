import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "./Loading.jsx";
import { useNavigate } from "react-router-dom";
import ProfileService from "../servicies/Profile.services.js";
import {
  FiMail,
  FiPhone,
  FiUser,
  FiMapPin,
  FiEdit2,
  FiUserX,
  FiFilePlus,
} from "react-icons/fi"; // Import icons
import { logout, login } from "../store/Auth.slice.js";
import handleLogout from "../../utils/LogoutHandler.js";
function Profile() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isLogin = useSelector((state) => state.auth.authStatus);
  const isOwner = userData?.isOwner || "false";
  const [load, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  // useEffect(() => {
  //   setLoading(true);
  //   ProfileService.getCurrentUser()
  //     .then((response) => {
  //       if (response?.success) {
  //         dispatch(login(response.data));
  //       } else {
  //         dispatch(logout());
  //         navigate("/");
  //       }
  //     })
  //     .catch((err) => {
  //       setErr(err.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [dispatch, navigate]);

  useEffect(() => {
    if (!isLogin || !userData) {
      // alert("You are not authenticated :(")
      navigate("/");
    }
  }, []);

  const onLogoutClick = async () => {
    try {
      dispatch(logout());
      const result = await handleLogout();
      if (result.success) {
        navigate("/"); // Redirect to login page after successful logout
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
      // Handle error (show toast/alert to user)
    }
  };

  return load ? (
    <Loading />
  ) : (
    <div className="min-h-screen py-8">
      {isLogin ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-amber-500 to-amber-800"></div>

            {/* Profile Section */}
            <div className="relative">
              {/* Profile Image */}
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                {userData?.isOwner ? (
                  <span className="absolute rotate-[25deg] text-white -top-7 right-3">
                    <i className="ri-vip-crown-2-line text-4xl"></i>
                  </span> ):(
                  <span className="absolute text-white -top-5 -right-3">
                    <i class="ri-sparkling-2-fill text-4xl"></i>
                  </span>
                )}
                <img
                  src={userData?.image || "avatar.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 backdrop-blur-lg border-white shadow-lg object-cover"
                />
              </div>

              {/* Edit Button */}
              <div className="absolute top-4 right-4">
                <Link
                  to={"./edit"}
                  className="flex items-center gap-2 bg-amber-950 hover:bg-amber-800 text-white px-3 md:px-4 py-2 rounded-full md:rounded-lg transition-colors duration-300"
                >
                  <i class="ri-file-edit-line"></i>
                  <span className="hidden md:inline-block mr-2">
                    {" "}
                    Edit Profile{" "}
                  </span>
                </Link>
              </div>
              <div className="absolute top-4 left-4">
                <button
                  title="Logout"
                  className="flex items-center gap-2 bg-amber-950 hover:bg-amber-800 text-white px-3 md:px-4 py-2 rounded-full md:rounded-lg transition-colors duration-300"
                  onClick={(event) => {
                    const isReadyToLogOut = confirm(
                      "Are you want to logout 😢"
                    );
                    if (isReadyToLogOut) {
                      onLogoutClick(event);
                    }
                  }}
                >
                  <span className="hidden md:inline-block mr-2"> Logout</span>
                  <i class="ri-user-unfollow-line"></i>
                </button>
              </div>
              {/* Profile Info */}
              <div className="pt-20 pb-8 px-8">
                <div className="text-center mb-8 ">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2 relative">
                    {/* <span className="font-bold text-xl text-gray-800/40 px-6 py-3 rounded absolute block left-0 -top-2">{userData?.isOwner ? "Owner" : "User" } </span> */}
                    {userData?.name || "User Name"}
                  </h1>
                  <p className="text-gray-500">
                    Member since {new Date(userData.createdAt).getFullYear()}
                  </p>
                </div>

                {/* Profile Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <FiMail className="w-6 h-6 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800">
                        {userData?.gmail || "email@example.com"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <FiPhone className="w-6 h-6 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-800">
                        {userData?.mobile || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <FiUser className="w-6 h-6 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="text-gray-800">
                        {userData?.gender || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <FiMapPin className="w-6 h-6 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-800">
                        {userData?.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {isOwner && (
                <div className="absolute bottom-2 md:bottom-1 right-2 md:right-1">
                  <Link
                    to={"./../products/add"}
                    title=" Add Products"
                    className="flex items-center gap-2 bg-amber-950 hover:bg-amber-800 text-white px-3 md:px-2 py-2 rounded-full md:rounded-lg transition-colors duration-300"
                  >
                    <i class="ri-file-add-line"></i>
                    <span className="hidden md:inline-block mr-2">
                      Add Products
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {err && (
            <p
              role="alert"
              className="py-2 px-4 bg-white/20 text-red-700 font-semibold text-base my-2 rounded border-red-600 border-2 "
            >
              {err}
            </p>
          )}
        </div>
      ) : (
        <p
          role="alert"
          className="py-2 px-4 bg-white/20 text-red-700 font-semibold text-base my-2 rounded border-red-600 border-2 "
        >
          {err}
        </p>
      )}
    </div>
  );
}

export default Profile;
