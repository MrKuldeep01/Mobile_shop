import React from 'react'

function Register() {
    // register ✅
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
    */
  return (
        <>
          <div className="container max-w-md mx-auto w-full md:w-3/4 lg:w-1/3">
            <div className=" hero max-w-[90%] sm:h-[70%] justify-center items-center mx-auto my-16 bg-zinc-300/10 px-8 sm:px-14 py-4 sm:py-8 md:py-14 rounded-3xl shadow-2xl">
              <div className="text-center my-8 sm:mt-6">
                <h1 className="font-thin text-4xl text-amber-950">Register</h1>
              </div>
              <form action="#" method="post">
                <div className="name mt-5">
                  <input
                    type="text"
                    placeholder="Name"
                    id="Name"
                    name="name"
                    required
                    className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
                  />
                </div>
                <div className="gmail mt-5">
                  <input
                    type="email"
                    placeholder="Email"
                    id="Email"
                    name="gmail"
                    required
                    className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
                  />
                </div>
                <div className="mobile mt-5">
                  <input
                    type="number"
                    placeholder="Phone no."
                    id="Mobile"
                    name="mobile"
                    required
                    className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
                  />
                </div>
                <div className=" gender mt-5 w-full flex items-center justify-start gap-2">
                    <label className='font-semibold text-black/40 flex items-center'>
                  <input
                    type="radio"
                    id="gender"
                    name="gender"
                    value={'female'}
                    className="m-2 size-5 border-none font-semibool"
                    /> Female                
                    </label>
                    <label className='font-semibold text-black/40 flex items-center'>
                  <input
                    type="radio"
                    id="gender"
                    name="gender"
                    value={'Male'}
                    className="m-2 size-5 border-none font-semibool"
                  /> Male
                  </label>

                </div>
                
                <div className="isOwner mt-5 w-full flex items-center justify-start gap-2">

                <label className='font-semibold text-black/40'>
                Are you Owner? 
                </label>
                <input type="checkbox" name="isOwner" id="isOwner" className='size-5'/>
                </div>
                <div className="image mt-5 w-full">
                    <label htmlFor="image" className='w-full flex items-center justify-start gap-2 cursor-pointer' > <i class="ri-image-add-fill ml-2 text-2xl"></i>
                    <input type="file" name="image" id="image" className='ml-0 invisible' required />
                    </label>
                </div>
                <div className="password mt-5">
                  <input
                    type="password"
                    placeholder="Password"
                    id="Password"
                    name="password"
                    required
                    className="block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900"
                  />
                </div>

                <div className="submit button mt-5">
                  <button
                    tyep="submit"
                    className="border-2 border-white bg-black text-white py-2 w-full rounded-xl active:bg-white active:text-black font-semibold active:scale-[1.02]"
                  >
                    Login
                  </button>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <div className="w-full flex items-center justify-between">
                    <a href="#" className="text-rose-600/80 text-sm font-semibold underline">
                      Existing User?
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
  )
}

export default Register
