
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/root/Root";
import Home from "../Pages/HomeComponents/home/Home";
import Register from "../Pages/register/Register";
import Login from "../Pages/login/Login";
import Dashboard from "../layout/dashboard/Dashboard";
import Profile from "../Pages/profile/Profile";
import DashboardContent from "../Pages/dashboardContent/DashboardContent";
import MyDonationRequests from "../Pages/myDonationRequests/MyDonationRequests";
import CreateDonationRequests from "../Pages/createDonationRequest/CreateDonationRequests";
import AllUsers from "../Pages/allUsers/AllUsers";
import AllDonationRequest from "../Pages/allDonationRequest/AllDonationRequest";
import ContentManagement from "../Pages/contentManagement/ContentManagement";
import AddBlog from "../Pages/addBlog/AddBlog";
import UpdateDonationRequest from "../Pages/updateDonationRequest/UpdateDonationRequest";
import DonationReqDetails from "../Pages/donationReqDetails/DonationReqDetails";
import UpdateBlogs from "../Pages/updateBlog/UpdateBlogs";
import AllDonationReqPublic from "../Pages/allDonationReqPublic/AllDonationReqPublic";
import mainUrl from "../services/helper";
import BlogsPublic from "../Pages/blogsPublic/BlogsPublic";
import BlogsDetails from "../Pages/blogsDetails/BlogsDetails";
import SearchPage from "../Pages/searchPage/SearchPage";
import Funding from "../Pages/Funding/Funding";
import GiveFunding from "../Pages/Funding/GiveFunding/GiveFunding";
import PrivateRoute from "./PrivateRoute";

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
        },
        {
            path:'/donation-requests-details/:id',
            element:<PrivateRoute><DonationReqDetails></DonationReqDetails></PrivateRoute>
        },
        {
            path:'/donation-requests',
            element:<AllDonationReqPublic></AllDonationReqPublic>,
            loader:()=>fetch(`${mainUrl}/all-donation-request-public`)
        },
        {
            path:'/blogs',
            element:<BlogsPublic></BlogsPublic>,
            loader:()=>fetch(`${mainUrl}/public-blogs`)
        },
        {
            path:'/blogsDetails/:id',
            element:<BlogsDetails></BlogsDetails>,
        },
        {
            path:'/search',
            element:<SearchPage></SearchPage>,
        },
        {
            path:'/funding',
            element:<PrivateRoute><Funding></Funding></PrivateRoute>,
            loader:()=> fetch(`${mainUrl}/allFunding`)
        },
        {
            path:'/give-funding/:amount',
            element:<PrivateRoute><GiveFunding></GiveFunding></PrivateRoute>,
        },
      ]
    },
    {
        path:'dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path:'/dashboard',
                element:<DashboardContent></DashboardContent>
            },
            {
                path:'profile',
                element:<Profile></Profile>,
            },
            {
                path:'create-donation-request',
                element:<CreateDonationRequests></CreateDonationRequests>
            },
            {
                path:'my-donation-requests',
                element:<MyDonationRequests></MyDonationRequests>
            },
            {
                path:'update-donation-requests/:id',
                element:<UpdateDonationRequest></UpdateDonationRequest>
            },
            {
                path:'all-users',
                element:<AllUsers></AllUsers>
            },
            {
                path:'all-blood-donation-request',
                element:<AllDonationRequest></AllDonationRequest>
            },
            {
                path:'content-management',
                element:<ContentManagement></ContentManagement>
            },
            {
                path:'content-management/add-blog',
                element:<AddBlog></AddBlog>
            },
            {
                path:'content-management/update/:id',
                element:<UpdateBlogs></UpdateBlogs>
            }
        ]
    },
  ]);

export default router;