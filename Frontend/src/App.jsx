import "./index.css";
import {Provider} from "react-redux"
import { Header, Footer, Login, Home, Register, ProductBanner, Product} from "./components/index.js"
import authStore from "./store/auth.store"
import Test from "./components/Test.jsx"
function App({outlet}) {
  return (
    <Provider store={authStore}>
      <Header/>
      {/* <Login /> */}
      <Register/>
      {/* <Test/> */}
        {/* <Product/>  */}
        {/* <ProductBanner productImgPath={'mobileShop.png'}/> */}
        {/* {outlet} */}
        {/* <Home/> */}
      <Footer/>
    </Provider>
  );
}

export default App;
