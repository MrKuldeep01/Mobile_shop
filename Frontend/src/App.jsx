import "./index.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ProductBanner from "./components/ProductBanner.jsx"
function App() {
  return (
    <>
      <Header />
      {/* <Login /> */}
      {/* <Register/> */}
        {/* <Product/> --*/}
        <ProductBanner productImgPath={'mobileShop.png'}/>
      {/* <Footer /> */}
    </>
  );
}

export default App;
