import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Login, Register, Product, Products, } from "./components/index.js"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store/Store.js"
const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children: [
      {
        path:"",
        element: <Login/>
      },
      {
        path:"regiser",
        element: <Register/>
      },
      {
        path:"products",
        element: <Products/>
      },
      {
        path:"products/:productId",
        element: <Product/>
      },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  </StrictMode>
)
