import "./index.css";
import {Provider} from "react-redux"
import { Header, Footer, Login, Home, Register, ProductBanner, Product} from "./components/index.js"
import authStore from "./store/auth.store"
function App({outlet}) {
  return (
    <Provider store={authStore}>
      <Header/>
      <Login />
      {/* <Register/> */}
        {/* <Product/>  */}
        {/* <ProductBanner productImgPath={'mobileShop.png'}/> */}
        {/* {outlet} */}
        {/* <Home/> */}
      <Footer/>
    </Provider>
  );
}

export default App;
