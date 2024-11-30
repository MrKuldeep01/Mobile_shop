import React, { useState } from "react";
import onChageHandler from "../../utils/changeHandler.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/Auth.slice.js";
import auth from "../servicies/Auth.services.js";
function Login() {
  const [loading, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const userDataFromSlice = useSelector((state) => state.auth.userData);
  // const url = `${envConfig.serverBaseURI}/auth/login`;
  // const changeHandler = (e) => {
  //   const key = e.ta[name;]  //   const value = e.ta[type ]== "file" ? e.ta[files[]] : e.ta[value;]  //   formData.set(key, value);
  //   console.log("Updated FormData:", Array.from(formData.entries()));
  // };
  const changeHandler = async (e) => {
    const { key, value } = onChageHandler(e);
    setFormData({ ...formData, [key]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoad(true);
    console.log("submitting");
    if (!formData["gmail"] && !formData["mobile"]) {
      setErr("Either Gmail or Mobile number is required!");
      setLoad(false);
      return;
    }
    if (formData["gmail"]) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData["gmail"])) {
        setErr("Invalid gmail format");
        setLoad(false);
        return;
      }
      if (formData["mobile"]) {
        setErr("No need to fill both gmail and mobile no.!");
        setLoad(false);
        return;
      }
    }
    if (formData["mobile"]) {
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(formData["mobile"])) {
        setErr("Mobile number must be 10 digits");
        setLoad(false);
        return;
      }
      if (formData["gmail"]) {
        setErr("No need to fill both gmail and mobile no.!");
        setLoad(false);
        return;
      }
    }
    if (!formData["password"]) {
      setErr("Password is required!");
      setLoad(false);
      return;
    }
    if (formData["password"].length < 6 || formData["password"].length > 8) {
      setErr("Password must be between 6 - 8 characters");
      setLoad(false);
      return;
    }

    console.log(formData);
    // setLoad(false);
    // setErr("");
    auth
      .login(formData)
      .then((res) => {
        // setRes(res);
        console.log("everything is looking good");
        console.log(res);

        if (res.success) {
          dispatch(login(res.data));
          alert("Login successful.");
          // window.location.href = "/me";
          console.log(userDataFromSlice);
        } else {
          setErr(data.message || "Login failed!");
        }
      })
      .catch((error) => {
        setErr(error.message || "Login failed!");
      })
      .finally(() => {
        setLoad(false);
        setErr("");
      });

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
  fields are : password, mobile, gmail
  */
  return (
    <>
      <div className="container max-w-md mx-auto w-full md:w-3/4 lg:w-1/3">
        <div className=" hero max-w-[90%] sm:h-[70%] justify-center items-center mx-auto my-16 bg-zinc-500/10 px-8 sm:px-14 py-4 sm:py-8 md:py-14 rounded-3xl shadow-2xl">
          <div className="text-center my-8 sm:mt-6">
            <h1 className="font-thin text-4xl text-amber-950">Login</h1>
          </div>
          <form onSubmit={submitHandler} method="Post">
            <div className="mt-5">
              <input
                type="email"
                placeholder="Email"
                name="gmail"
                onChange={changeHandler}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
              />
            </div>
            <div className="mt-5">
              <input
                type="number"
                placeholder="Phone no."
                name="mobile"
                minLength={10}
                onChange={changeHandler}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
              />
            </div>
            <div className="mt-5">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={changeHandler}
                required
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
              />
            </div>
            <div className="mt-5">
              <select
                name="isOwner"
                id="isOwner"
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
                onChange={changeHandler}
              >
                <option>select your profile :-</option>
                <option value="no">user</option>
                <option value="yes">owner</option>
              </select>
            </div>
            <div className="mt-5">
              {err && <p className="text-red-500">{err}</p>}
              {loading && <p className="text-red-500">Loading...</p>}
            </div>
            <div className="mt-5">
              <input
                type="submit"
                className="w-full bg-amber-950 text-white rounded-lg px-4 py-3 mt-6 hover:bg-amber-800 focus:outline-2 focus:outline-white/70 focus:outline-opacity-50 "
                value={"Loading"}
              />
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="w-full flex items-center justify-between">
                <Link
                  to="/register"
                  className="text-rose-600/80 text-sm font-semibold underline"
                >
                  New User?
                </Link>
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
