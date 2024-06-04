
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/root/Root";
import Home from "../Pages/HomeComponents/home/Home";
import Register from "../Pages/register/Register";
import Login from "../Pages/login/Login";
import mainUrl from "../services/helper";
import Dashboard from "../layout/dashboard/Dashboard";
import Profile from "../Pages/profile/Profile";
import DashboardContent from "../Pages/dashboardContent/DashboardContent";
import MyDonationRequests from "../Pages/myDonationRequests/MyDonationRequests";

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
                path:'',
                element:<DashboardContent></DashboardContent>
            },
            {
                path:'profile',
                element:<Profile></Profile>,
            },
            {
                path:'my-donation-requests',
                element:<MyDonationRequests></MyDonationRequests>
            }
        ]
    }
  ]);

export default router;