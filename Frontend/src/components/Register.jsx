import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// =================
function Register() {
  const {
    register,
    handleSubmit,
  } = useForm();
  const [error, setError] = useState(null);

  const submitHandler = async (data) => {
    try {
      const image = data.image[0];
      if (!image) {
        setError("please upload the image file to proceed further!");
      }
      const formData = new FormData();
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          if (key === "image") {
            formData["image"] = image;
          }
          formData[key] = data[key];
          console.log("key: ", key, "\tvalue: ", data[key]);
        }
      }
      console.log(formData);    /////////////////// step up for forms
      // const response = await fetch(
      //   "http://localhost:3000/api/v1/auth/register",
      //   {
      //     method: "POST",
      //     body: formData,
      //   }
      // );
      // const result = await response.json();
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  /*
name,
    gmail,
    mobile,
    gender,
    password,
    address,
    rating,
    experience,
    isOwner,
    image from file with name 'image'

    uri: http://localhost:3000/api/v1/auth/register
    */

  return (
    <>
      <div className="container max-w-md mx-auto w-full md:w-3/4 lg:w-1/3">
        <div className=" hero max-w-[90%] sm:h-[70%] justify-center items-center mx-auto my-6 bg-zinc-300/10 px-8 sm:px-14 py-4 sm:py-8 md:py-14 rounded-3xl shadow-2xl">
          <div className="text-center my-8 sm:mt-6">
            <h1 className="font-thin text-4xl text-amber-950">Register</h1>
          </div>
          <form
            action="#"
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="name mt-5">
              <input
                type="text"
                placeholder="Name"
                id="Name"
                {...register("name", { required: true, maxLength: 20 })}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
              />
            </div>
            <div className="gmail mt-5">
              <input
                type="email"
                placeholder="Email"
                id="Email"
                {...register("gmail", { required: true })}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
              />
            </div>
            <div className="mobile mt-5">
              <input
                type="number"
                placeholder="Phone no."
                id="Mobile"
                {...register("mobile", { min: 18, max: 99, required: true })}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
              />
            </div>
            <div className=" gender mt-5 w-full flex items-center justify-start gap-2">
              <select {...register("gender")} className="font-semibold text-sm">
                <option defaultValue="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="isOwner mt-5 w-full flex items-center justify-start gap-2">
              <select
                {...register("isOwner")}
                className="font-semibold text-sm"
              >
                <option value="no"> User </option>
                <option value="yes"> Owner </option>
              </select>
            </div>
            <div className="image mt-5 w-full">
              <label
                htmlFor="image"
                className="w-full flex items-center justify-start gap-2 cursor-pointer"
              >
                {" "}
                <i className="ri-image-add-fill ml-2 text-2xl"></i>
                <input
                  type="file"
                  {...register("image", { required: true })}
                  id="image"
                  className="ml-0 invisible"
                />
              </label>
            </div>
            <div className="password mt-5">
              <input
                type="password"
                placeholder="Password with length: 6-10"
                id="Password"
                {...register("password", { required: true, min: 6, max: 10 })}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
              />
            </div>
            {error && (
              <span
                role="alert"
                className="font-semibold text-sm text-red-600 bg-white/70 px-2 py-1 my-2 rounded-md"
              >
                {error}
              </span>
            )}
            <div className="submit button mt-5">
              <button
                type="submit"
                className="border-2 border-white bg-black text-white py-2 w-full rounded-xl active:bg-white active:text-black font-semibold active:scale-[1.02]"
              >
                Register
              </button>
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
