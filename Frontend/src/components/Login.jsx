import React, { useState } from "react";
import onChageHandler from "../../utils/changeHandler.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/Auth.slice.js";
import auth from "../servicies/Auth.services.js";
function Login() {
  const [loading, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = async (e) => {
    const { key, value } = onChageHandler(e);
    setFormData({ ...formData, [key]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoad(true);
    console.log("submitting...");
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
    }
    if (formData["mobile"]) {
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(formData["mobile"])) {
        setErr("Mobile number must be 10 digits");
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
        if (res.success) {
          dispatch(login(res.data));
          alert("Login successful.");
          navigate("/me");
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

   
  };
  /*
  fields are : password, mobile, gmail, isOwner
  */
  return (
    <>
      <div className="container max-w-md mx-auto w-full md:w-3/4">
        <div className=" hero max-w-[90%] sm:h-[70%] justify-center items-center mx-auto my-16 bg-zinc-500/10 px-4 sm:px-10 py-4 sm:py-8 md:py-14 rounded-3xl shadow-2xl">
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
                <option value="false">user</option>
                <option value="true">owner</option>
              </select>
            </div>
            <div className="mt-5">
              {err && <p className="text-red-500">{err}</p>}
            </div>
             <div className="buttonSection w-full flex items-center justify-between gap-2 mt-5">
                        <Link
                          to="/register"
                          className="bg-amber-900 text-white rounded-lg px-4 py-3 mt-6 hover:bg-amber-800 focus:outline-2 focus:outline-white/70 focus:outline-opacity-50 "
                        >
                          Register 
                        </Link>
              <input
                type="submit"
                className="w-full bg-amber-950 text-white rounded-lg px-4 py-3 mt-6 hover:bg-amber-800 focus:outline-2 focus:outline-white/70 focus:outline-opacity-50 "
                value={loading ? "loading..." : "Login"}

              />                       
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
