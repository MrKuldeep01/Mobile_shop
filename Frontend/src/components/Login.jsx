import React,{useState} from "react";
import {useForm} from "react-hook-form"

function Login() {
  const {register, handleSubmit} = useForm()
  const [file, setFile] = useState({})
  const submithandler = data => {
    setFile(data.image)
    console.log(file);
    console.log(data);
  }
  return (
    <>
      <div className="container max-w-md mx-auto w-full md:w-3/4 lg:w-1/3">
        <div className=" hero max-w-[90%] sm:h-[70%] justify-center items-center mx-auto my-16 bg-zinc-500/10 px-8 sm:px-14 py-4 sm:py-8 md:py-14 rounded-3xl shadow-2xl">
          <div className="text-center my-8 sm:mt-6">
            <h1 className="font-thin text-4xl text-amber-950">Login</h1>
          </div>
          <form action="#"onSubmit={handleSubmit(submithandler)}>
            <div className="mt-5">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
              />
            </div>
            <div className="mt-5">
              <input
                type="number"
                placeholder="Phone no."
                {...register("mobile")}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
              />
            </div>
            <div className="mt-5">
              <input
                type="file"
                placeholder="image"
                {...register("image")}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
              />
            </div>
            <div className="mt-5">
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
              />
            </div>
            <div className="mt-5">
              <input
                type="submit"
                className="border-2 border-white bg-[#c1dd42] text-white py-2 w-full rounded-xl active:bg-[#acc92b] hover:text-white-700 font-semibold active:scale-[1.02]"
                value = "login"
              />
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="w-full flex items-center justify-between">
                <a href="#" className="text-rose-600/80 text-sm font-semibold underline">
                  New User?
                </a>
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

export default Login;
