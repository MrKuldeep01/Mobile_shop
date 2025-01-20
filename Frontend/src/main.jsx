import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Login, Register, Profile, EditProfile, AddProducts, Products, Home, ReviewProduct, NotFound, Search } from "./components/index.js"
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
        path:"home",
        element: <Home/>
      },
      {
        path:"register",
        element: <Register/>
      },
      {
        path:"me",
        children:[
          {
            path:"",
            element:<Profile/>
          },
          {
            path:"edit",
            element:<EditProfile/>
          },
        ]
      },
      { 
        path:"products",
        children:[
          {
            path:"",
            element:<Products/>
          },
          {
            path:"search",
            element:<Search/>
          },
          {
            path:"add",
            element:<AddProducts/>
          },
          {
            path:"edit/:productId",
            element:<AddProducts/>
          },
          {
            path:"review/add/:productId",
            element:<ReviewProduct/>
          },
          {
            path:"review/edit/:productId/:reviewId",
            element:<ReviewProduct/>  
          },
        ]
      },
      // 404 Not Found Route
      {
        path: '*', // Catch all unmatched routes
        element: <NotFound />,
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
