import "./index.css";
import {Provider, useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react";
import { Header, Footer, Login, Home, Register, ProductBanner, Product} from "./components/index.js"
import authService from "./servicies/Auth.services.js";
import { login, logout } from "./store/Auth.slice.js";
function App({outlet}) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(()=>{
    authService.getCurrentUser()
    .then(userData=>{
    if(userData){
      dispatch(login(userData));
    }else{
        dispatch(logout());
      }
    })
    .catch(error=>{
      console.log("Error while getting current user :: app.jsx :: useEffect :- "+error);
    }).finally(()=>{
      setLoading(false);
    })
  },[])

  return loading ? (<div>Loading...</div>) : (
<div className="min-h-screen flex flex-wrap content-center">
  <div className="w-full block">
    <Header/>
    <main>
      {/* {outlet} */}
    </main>
    <Footer/>
  </div>
</div>
  // )
  //     <Header/>
  //     {/* <Login /> */}
  //     <Register/>
  //     {/* <Test/> */}
  //       {/* <Product/>  */}
  //       {/* <ProductBanner productImgPath={'mobileShop.png'}/> */}
  //       {/* {outlet} */}
  //       {/* <Home/> */}
  //     <Footer/>
  )
}

export default App;
