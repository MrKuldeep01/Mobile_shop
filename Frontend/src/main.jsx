import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Login, Register, Profile} from "./components/index.js"
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
        path:"register",
        element: <Register/>
      },
      {
        path:"me",
        element: <Profile/>
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
