import React from 'react';
import ReactDOM from 'react-dom/client';
import {Outlet, createBrowserRouter, RouterProvider} from "react-router-dom"

import './index.css';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

const App=()=>{
  return (
    <div>
      <Outlet/>
    </div>
  );
}

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Landing/>
      },
      {
        path:"/signup",
        element:<SignUp/>
      },
      {
        path:"/login",
        element:<Login/>
      }
    ]
  }
])


const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />)


