import React from "react";

function Login() {
  return (
    <>
      <div class="container max-w-md mx-auto w-full md:w-3/4 lg:w-1/3">
        <div class="max-w-6 h-1/2 justify-center items-center mx-auto my-12 bg-white px-14 py-40 rounded-3xl shadow-2xl">
          <div class="text-center mt-200">
            <h1 class="font-thin text-4xl ">Login</h1>
          </div>
          <form action="#">
            <div class="mt-5">
              <label for="username">Email</label>
              <input
                type="text"
                id="Email"
                class="block w-full p-2 border rounded border-gray-500"
              />
            </div>
            <div class="mt-5">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                class="block w-full p-2 border rounded border-gray-500"
              />
            </div>
            <div class="mt-5">
              <button
                tyep="submit"
                class="border-2 border-white bg-black text-white py-2 w-full rounded-xl hover:bg-purple-700 hover:text-white-700 font-semibold"
              >
                Login
              </button>
            </div>
            <div class="mt-3 flex justify-between items-center">
              <div>
                <input type="checkbox" />
                <label>Remember Me</label>
              </div>
              <div>
                <a href="#" class="text-purple-400 font-semibold underline">
                  Forget Password?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
