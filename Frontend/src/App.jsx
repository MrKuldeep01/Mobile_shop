import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react";
import { Header, Footer, Register } from "./components";
import Profile from "./servicies/Profile.services.js";
import ProductService from "./servicies/Product.services.js";
import Loading from "./components/Loading.jsx"
import { login, logout } from "./store/Auth.slice.js";
import Container from "./components/container/Container.jsx";
import { useNavigate } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // get current user
  useEffect(()=>{
    setLoading(true)
    Profile.getCurrentUser()
    .then(response=>{
    if(response?.success){
      dispatch(login(response.data));
      console.log("authenticated")
      navigate('/me')

    }else{
      dispatch(logout());
      console.log("not authenticated")
      navigate('/')
       }
    })
    .catch(err=>{
      setErr(err)
    }).finally(()=>{
      setLoading(false);
    })
  },[])

  // get all products
  // useEffect(()=>{
  //   ProductService.getProductList()
  //   .then(products=>{
  //     // dispatch(setProducts(products));
  //   })
  //   .catch(error=>{
  //     console.log("Error while getting all products :: app.jsx :: useEffect :- \n" + error);
  //   }).finally(()=>{
  //     setLoading(false);
  //   })
  // },[])
  
  return loading ? (
    <Loading/>
  ) : (
    <div className="min-h-screen flex flex-wrap content-center">
      <div className="w-full block">
        <Header />
        <Container >
          <Outlet />
        </Container>
        <Footer />
      </div>
    </div>
  );
}
export default App;
