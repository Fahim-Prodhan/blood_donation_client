
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/root/Root";
import Home from "../Pages/HomeComponents/home/Home";
import Register from "../Pages/register/Register";
import Login from "../Pages/login/Login";
import mainUrl from "../services/helper";
import Dashboard from "../layout/dashboard/Dashboard";
import Profile from "../Pages/profile/Profile";

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
            element:<Register></Register>,
            loader: async () => {
                const [districtsResponse, upazilasResponse] = await Promise.all([
                    fetch(`${mainUrl}/districts`),
                    fetch(`${mainUrl}/upazilas`)
                ]);
        
                const districts = await districtsResponse.json();
                const upazilas = await upazilasResponse.json();
        
                return {
                    districts,
                    upazilas
                };
            }
        },
        {
            path:'/login',
            element:<Login></Login>
        }
      ]
    },
    {
        path:'dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:'profile',
                element:<Profile></Profile>,
                loader: async () => {
                    const [districtsResponse, upazilasResponse] = await Promise.all([
                        fetch(`${mainUrl}/districts`),
                        fetch(`${mainUrl}/upazilas`)
                    ]);
            
                    const districts = await districtsResponse.json();
                    const upazilas = await upazilasResponse.json();
            
                    return {
                        districts,
                        upazilas
                    };
                }
            }
        ]
    }
  ]);

export default router;