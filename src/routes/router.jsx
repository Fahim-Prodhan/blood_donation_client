
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/root/Root";
import Home from "../Pages/HomeComponents/home/Home";
import Register from "../Pages/register/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/register',
            element:<Register></Register>
        }
      ]
    },
  ]);

export default router;