import "./index.css";
import { useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react";
import { Header,
  Footer, AddProduct} from "./components"
import ProfileService from "./servicies/Profile.services.js";
import ProductService from "./servicies/Product.services.js";
import { login, logout } from "./store/Auth.slice.js";
import Container from "./components/container/Container.jsx";
function App({outlet}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
// get current user
  // useEffect(()=>{
  //   ProfileService.getCurrentUser()
  //   .then(userData=>{
  //   if(userData){
  //     dispatch(login(userData));
  //   }else{
  //       dispatch(logout());
  //      }
  //   })
  //   .catch(error=>{
  //     console.log("Error while getting current user :: app.jsx :: useEffect :- "+error);
  //   }).finally(()=>{
  //     setLoading(false);
  //   })
  // },[])

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

  return loading ? (<div>Loading...</div>) : (
<div className="min-h-screen flex flex-wrap content-center">
  <div className="w-full block">
    <Header/>
      <Container>
        {/* {outlet} */}
        <h1 className="text-4xl font-bold text-center"> Welcome to our website </h1>
        {/* <Login/> */}
        <AddProduct/>
      </Container>
    <Footer/>
  </div>
</div>
 )
}
export default App;
