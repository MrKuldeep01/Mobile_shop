import "./index.css";
import { Header, Footer, Login, Home, Register, ProductBanner, Product} from "./components/index.js"
function App({outlet}) {
  return (
    <>
      <Header/>
      <Login />
      {/* <Register/> */}
        {/* <Product/>  */}
        {/* <ProductBanner productImgPath={'mobileShop.png'}/> */}
        {/* {outlet} */}
        {/* <Home/> */}
      <Footer/>
    </>
  );
}

export default App;
