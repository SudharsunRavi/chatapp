import {Outlet, createBrowserRouter} from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

const App=()=>{
  return (
    <div>
      <Outlet/>
      <Toaster/>
    </div>
  );
}


const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
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

export default appRouter
