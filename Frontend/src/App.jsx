import "./index.css";
import { Header, Footer, Login, Register, ProductBanner} from "./components/index.js"
function App() {
  return (
    <>
      <Header/>
      {/* <Login /> */}
      {/* <Register/> */}
        {/* <Product/> --*/}
        <ProductBanner productImgPath={'mobileShop.png'}/>
      <Footer/>
    </>
  );
}

export default App;
