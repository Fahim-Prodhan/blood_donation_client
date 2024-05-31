
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/root/Root";
import Home from "../Pages/HomeComponents/home/Home";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        }
      ]
    },
  ]);

export default router;