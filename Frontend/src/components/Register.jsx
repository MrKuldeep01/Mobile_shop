import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { login } from "../store/Auth.slice.js" 
import auth from "../servicies/Auth.services.js"

import onChangeHandler from "../../utils/changeHandler.js";
// =================

function Register() {
  const [err , setErr] = useState("");
  const [loading, setLoad] = useState(false);
  // const [formData, setFormData] = useState(new FormData()); 
  const [formData, setFormData] = useState({}); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeHandler = (e) => {
    const {key, value} = onChangeHandler(e);
    // formData.set(key, value);
    setFormData({...formData,[key]:value})
  };  
  /*
name,
    gmail,
    mobile,
    gender,
    password,
    address,
    isOwner,
    image from file with name 'image'

    uri: http://localhost:3000/api/v1/auth/register
    */
    const submitHandler = (e) => {
      e.preventDefault();
      setLoad(true);
      setErr("");
// validate formData before sending to server
    // Validate required fields
    const requiredFields = ['name', 'gmail', 'mobile', 'gender', 'password'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setErr(`${field} is required!`);
        setLoad(false);
        return;
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData['gmail'])) {
      setErr('Invalid email format');
      setLoad(false);
      return;
    }

    // Validate mobile number (10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formData['mobile'])) {
      setErr('Mobile number must be 10 digits');
      setLoad(false);
      return;
    }

    // Validate password (min 6 chars)
    if (formData['password'].length < 6) {
      setErr('Password must be at least 6 characters');
      setLoad(false);
      return;
    }
    console.log(formData) // testing 
    // calling services to move further
    auth.register(formData)
    .then(res => {
      // setRes(res);      
      // Redirect or show success message
      if (res.success) {
        // You can add react-router navigation here        
        // alert("Registration successful! Please login.");
        dispatch(login(res.data))
        // window.location.href = '/login';
        navigate('/me');  // redirection to the home or profile page

      } else {
        setErr(res.message || "Registration failed");        
      }
    })
    .catch(error => {
      setErr( error.message || "Registration failed");
    })
    .finally(() => {
      setLoad(false);
      setErr("")
    })

    // fetch(url, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       setErr("Network response was not ok");
    //       throw new Error("Error occurred");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setRes(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setErr("An error occurred: " + error);
    //   })
    //   .finally(() => {
    //     setLoad(false);
    //     console.log("Loading is set to: ", loading);
    //   });
  };

  return (
    <>
      <div className="container max-w-md mx-auto w-full md:w-3/4 lg:w-1/3">
        <div className=" hero max-w-[90%] sm:h-[70%] justify-center items-center mx-auto my-6 bg-zinc-300/10 px-8 sm:px-14 py-4 sm:py-8 md:py-14 rounded-3xl shadow-2xl">
          <div className="text-center my-8 sm:mt-6">
            <h1 className="font-thin text-4xl text-amber-950">Register</h1>
          </div>
          <form
            encType="multipart/form-data"
            // onSubmit={handleSubmit(submitHandler)}
            onSubmit={submitHandler}
          >
            <div className="name mt-5">
              <input
                type="text"
                placeholder="Name"
                id="Name"
                name="name"
                required
                onChange={changeHandler}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibold text-amber-900"
              />
            </div>
            <div className="gmail mt-5">
              <input
                type="email"
                placeholder="Email"
                id="Email"
                name="gmail"
                onChange={changeHandler}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibold text-amber-900"
              />
            </div>
            <div className="mobile mt-5">
              <input
                type="number"
                placeholder="Phone no."
                id="Mobile"
                name="mobile"
                onChange={changeHandler}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibold text-amber-900"
              />
            </div>
            <div className=" gender mt-5 w-full flex items-center justify-start gap-2 ">
             <label htmlFor="gender" className="text-amber-900 font-semibold outline-1 outline-dashed outline-zinc-600/50 border-none p-2 rounded-md w-full flex items-center justify-around ">
             gender : 
              <select
                name="gender"                
                id="gender"                
                onChange={changeHandler}
                className="font-semibold text-base mx-2 px-2 py-1 rounded-md "
              >
                <option > Select value </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select> 
             </label>
            </div>

            <div className="isOwner mt-5 w-full flex items-center justify-start gap-2">
             <label htmlFor="isOwner" className="text-amber-900 font-semibold outline-1 outline-dashed outline-zinc-600/50 border-none p-2 rounded-md w-full flex items-center justify-around ">
              isOwner :
              <select
                name="isOwner"
                id="isOwner"               
                onChange={changeHandler}
                className="font-semibold text-base mx-2 px-2 py-1 rounded-md "
              >
                <option > Select value </option>
                <option value="false"> User </option>
                <option value="true"> Owner </option>
              </select>
             </label>
            </div>
            <div className="image mt-5 w-full p-2 rounded-md outline-1 outline-dashed outline-zinc-600/50">
              <label
                htmlFor="image"
                className="w-full flex items-center justify-start gap-2 cursor-pointer"
              >
                <input
                  type="file"
                  name="image"
                  onChange={changeHandler}
                  id="image"
                  className="block w-full border-none font-semibold text-amber-900"
                />
                <i className="ri-image-add-fill ml-2 text-2xl"></i>
              </label>
            </div>
            <div className="password mt-5">
              <input
                type="text"
                placeholder="Address"
                id="Address"
                name="address"
                onChange={changeHandler}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibold text-amber-900"
              />
            </div>
            <div className="password mt-5">
              <input
                type="password"
                placeholder="Password with length: 6-10"
                id="Password"
                name="password"
                onChange={changeHandler}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibold text-amber-900"
              />
            </div>
            { err && <p
                role="alert"
                autoFocus
                className="py-2 px-4 bg-white/20 text-red-700 font-semibold text-base my-2 rounded border-red-600 border-2 "
              >
                {err}
              </p>
            }
            <div className="submit button mt-5">
              {/* <button
                type="submit"
                className="border-2 border-white bg-black text-white py-2 w-full rounded-xl active:bg-white active:text-black font-semibold active:scale-[1.02]"
              >
                Register
              </button> */}
              {loading && (
                <p className="py-2 px-4 text-center bg-white/20 text-rose-700 font-semibold text-base my-2 rounded-md border-red-600">
                  Loading...
                </p>
              )}

              <input
                type="submit"
                value="Register"
                disabled={loading}
                className="w-full bg-amber-950 text-white rounded-lg px-4 py-3 mt-6 hover:bg-amber-800 focus:outline-2 focus:outline-white/70 focus:outline-opacity-50 "
              />
            </div>

            <div className="mt-3 flex justify-between items-center">
              <div className="w-full flex items-center justify-between">
                <Link
                  to="/login"
                  className="text-rose-600/80 text-sm font-semibold underline"
                >
                  Existing User?
                </Link>
                {/* <a href="#" className="text-rose-600/40 text-sm font-semibold underline">
                      Forget Password?
                    </a> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
