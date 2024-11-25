import React, { useState } from "react";
import onChageHandler from "../../utils/changeHandler.js";
import envConfig from "../../config/envConfig.js";
import { useDispatch } from "react-redux"
import {login, logout} from "../store/Auth.slice.js"
function Login() {
  const [loading, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch()

  // const url = `${envConfig.serverBaseURI}/auth/login`;

  // const changeHandler = (e) => {
  //   const key = e.ta[name;]  //   const value = e.ta[type ]== "file" ? e.ta[files[]] : e.ta[value;]  //   formData.set(key, value);
  //   console.log("Updated FormData:", Array.from(formData.entries()));
  // };
  const changeHandler = async (e) => {
    const { key, value } = onChageHandler(e);  
    setFormData({...formData, [key]: value});  
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoad(true);
    console.log("submitting");
// validate formData before sending to server
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData['email'])) {
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

  console.log(formData);
  // setLoad(false);
  // setErr("");

  auth.login(formData)
  .then(data => {
    // setRes(data);
    console.log("everything is looking good")
    console.log(data);
    if (data.success) {
      // You can add react-router navigation here
      dispatch(login(data.data))
      alert("Login successful.");
      window.location.href = '/';
    } else {
      setErr(data.message || "Login failed");
    }
  })
  .catch(error => {
    setErr(error.response?.data?.message || error.message || "Login failed");
  })
  .finally(() => {
    setLoad(false);
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
  /*
  fields are : password, mobile, email
  */
  return (
    <>
      <div className="container max-w-md mx-auto w-full md:w-3/4 lg:w-1/3">
        <div className=" hero max-w-[90%] sm:h-[70%] justify-center items-center mx-auto my-16 bg-zinc-500/10 px-8 sm:px-14 py-4 sm:py-8 md:py-14 rounded-3xl shadow-2xl">
          <div className="text-center my-8 sm:mt-6">
            <h1 className="font-thin text-4xl text-amber-950">Login</h1>
          </div>
          <form
            onSubmit={submitHandler}
          >
            <div className="mt-5">
              <input
                type="email"
                placeholder="Email"
                name= "email"
                onChange={changeHandler}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
              />
            </div>
            <div className="mt-5">
              <input
                type="number"
                placeholder="Phone no."
                name= "mobile"
                minLength={10}
                onChange={changeHandler}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
              />
            </div>
            <div className="mt-5">
              <input
                type="password"
                placeholder="Password"
                name= "password"
                onChange={changeHandler}
                required
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
              />
            </div>
            <div className="mt-5">
              {err && <p className="text-red-500">{err}</p>}
              {loading && <p className="text-red-500">Loading...</p>}
              
            </div>
            <div className="mt-5">
              <input
                type="submit"
                className="border-2 border-white bg-[#c1dd42] text-white py-2 w-full rounded-xl active:bg-[#acc92b] hover:text-white-700 font-semibold active:scale-[1.02]"
                value="login"
              />
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="w-full flex items-center justify-between">
                <a
                  href="#"
                  className="text-rose-600/80 text-sm font-semibold underline"
                >
                  New User?
                </a>
                {/* <a href="#" className="text-rose-600/40 text-sm font-semibold underline">
                  Fo[Password?]                </a> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
