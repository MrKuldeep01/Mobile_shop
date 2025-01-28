import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/Auth.slice.js";
import profile from "../servicies/Profile.services.js";
import onChangeHandler from "../../utils/changeHandler.js";

function EditUser() {
  // newName {y}, newGmail {y}, newMobile {y}, newAddress {y}, experience {n}
  // image {y} middleware
  const [err, setErr] = useState("");
  const [loading, setLoad] = useState(false);
  // const [formData, setFormData] = useState(new FormData());
  const [formData, setFormData] = useState({});
  const currentUser = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if(!currentUser){
      console.log("userData not available!")
     navigate('/')
    }
    else{
      console.log(currentUser&&"user data is available")
    }
  }, [currentUser,navigate]);

  const changeHandler = (e) => {
    const { key, value } = onChangeHandler(e);
    setFormData({ ...formData, [key]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setLoad(true);
    setErr("");
    // validate formData before sending to server
    // Validate required fields
    // Validate email format
    if (formData["newGmail"]) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData["newGmail"])) {
        setErr("Invalid email format");
        setLoad(false);
        return;
      }
    }

    // Validate mobile number (10 digits)
    if (formData["newMobile"]) {
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(formData["newMobile"])) {
        setErr("Mobile number must be 10 digits");
        setLoad(false);
        return;
      }
    }
    console.log(formData); // testing
    // calling services to move further
    profile
      .editDetails(formData)
      .then((res) => {
        if (res.success) {
          dispatch(login(res.data));
          navigate("/me");
        } else {
          setErr(res.message || "Edit failed");
        }
      })
      .catch((error) => {
        setErr(error.message || "Edit failed");
      })
      .finally(() => {
        setLoad(false);
        setErr("");
      });
  };
  return (
    <div className="container max-w-md mx-auto w-full md:w-3/4">
      <div className=" hero max-w-[90%] sm:h-[70%] justify-center items-center mx-auto my-6 bg-zinc-300/10 px-8 sm:px-14 py-4 sm:py-8 md:py-14 rounded-3xl shadow-2xl">
        <div className="text-center my-8 sm:mt-6">
          <h1 className="font-thin text-4xl text-amber-950">Edit Profile</h1>
        </div>
        <form encType="multipart/form-data" onSubmit={submitHandler}>
          <div className="name mt-5">
            <input
              type="text"
              placeholder="Name"
              name="newName"
              onChange={changeHandler}
              className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibold text-amber-900"
            />
          </div>
          <div className="gmail mt-5">
            <input
              type="email"
              placeholder="Email"
              name="newGmail"
              onChange={changeHandler}
              className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibold text-amber-900"
            />
          </div>
          <div className="mobile mt-5">
            <input
              type="number"
              placeholder="Phone no."
              id="Mobile"
              name="newMobile"
              onChange={changeHandler}
              minLength={10}
              maxLength={10}
              className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibold text-amber-900"
            />
          </div>
          <div className="image mt-5 w-full p-2 rounded-md outline-1 outline-dashed outline-zinc-600/50">
            <label
              htmlFor="image"
              className="w-full flex items-center justify-start gap-2 cursor-pointer"
            >
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={changeHandler}
                id="image"
                className="block w-full border-none font-semibold text-amber-900"
              />
              <i className="ri-image-add-fill ml-2 text-2xl"></i>
            </label>
          </div>
          <div className="address mt-5">
            <input
              type="text"
              placeholder="Address"
              id="Address"
              name="newAddress"
              minLength={4}
              maxLength={20}
              onChange={changeHandler}
              className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibold text-amber-900"
            />
          </div>
          {currentUser.isOwner && (
            <div className="experience mt-5">
              <input
                type="number"
                placeholder="experience 0 - 10"
                name="experience"
                min={0}
                max={10}
                onChange={changeHandler}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibold text-amber-900"
              />
            </div>
          )}
          <div className="error loading mt-5 gap-2">
            {err && (
              <p
                role="alert"
                autoFocus
                className="py-2 px-4 bg-white/20 text-red-700 font-semibold text-base my-2 rounded border-red-600 border-2 "
              >
                {err}
              </p>
            )}
            {loading && (
              <p className="py-2 px-4 text-center bg-white/20 text-rose-700 font-semibold text-base my-2 rounded-md border-red-600">
                Loading...
              </p>
            )}
          </div>
          <div className="buttonSection w-full flex items-center justify-between gap-2 mt-5">
          <Link
            to="/me"
            className="bg-amber-950 text-white rounded-lg px-4 py-3 mt-6 hover:bg-amber-800 focus:outline-2 focus:outline-white/70 focus:outline-opacity-50 "
          >
            <i className="ri-arrow-left-s-fill"></i>
          </Link>
            <input
              type="submit"
              value="Edit"
              disabled={loading}
              className="w-full bg-amber-950 text-white rounded-lg px-4 py-3 mt-6 hover:bg-amber-800 focus:outline-2 focus:outline-white/70 focus:outline-opacity-50 "
            />
          </div>
        </form>
      </div>
    </div>
  );
  // =====================
}

export default EditUser;
