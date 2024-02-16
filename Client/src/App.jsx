import "react-toastify/dist/ReactToastify.css";
import "./app.css"
import "./locomotive-scoll.css"

import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Suspense, lazy } from "react"

import Feedback from "./pages/profile/Reviews/Feedback";
import ForgotPass from "./pages/login/ForgotPass";
import  CheckMail  from "./pages/login/CheckMail";
import ResetPass from "./pages/login/ResetPass";
// import OrderDetails from "./pages/profile/OrderDetails";
import Lagacy from "../src/pages/home/Features_mrp/Legacy/Legacy"
import Legacy from "../src/pages/home/Features_mrp/Legacy/Legacy";
const OrderDetails = lazy(() => import("./pages/profile/Order/OrderDetails"))
const Home = lazy(() => import("./pages/home/Home"))
const Login = lazy(() => import("./pages/login/Login"))
const Stones = lazy(() => import("./pages/stones/Stones"))
const StoneDetail = lazy(() => import("./pages/stones/StoneDetail"))
const Cart = lazy(() => import("./pages/cart/Cart"))
const Profile = lazy(() => import("./pages/profile/Profile"))
const Notfound = lazy(() => import("./common/Error/Notfound"))
const Layout = lazy(() => import("./Layout"))
const Checkout = lazy(() => import("./pages/order/checkout"))
const SuccessPayment = lazy(() => import("./pages/order/SuccessPayment"))
const EditProfile = lazy(() => import("./pages/profile/EditProfile"))
const MyOrder = lazy(() => import("./pages/profile/Order/MyOrder"))
const DeliveryAddress = lazy(() => import("./pages/profile/DeliveryAddress"))
const SuccessOrder = lazy(() => import("./pages/order/SuccessOrder"))
const Payment = lazy(() => import("./pages/order/Payment"))

// admin

const Category = lazy(()=>import("./pages/admin/components/Category/Category"))
const Dashboard = lazy(() => import("./pages/admin/components/Dashboard"))
const Diamonds = lazy(() => import("./pages/admin/components/Diamonds/Diamonds"))
const Reviews = lazy(() => import("./pages/admin/components/Feedback/Feedback"))
const Order = lazy(() => import("./pages/admin/components/Order/Order"))
const Customer = lazy(() => import("./pages/admin/components/Customer/Customer"))
const AddDiamond = lazy(() => import("./pages/admin/components/AddDiamond"))
const AdminRoute = lazy(() => import("./pages/admin/AdminRoute"))
const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'login',
          element: <Login />,

        },
        {
          path: 'forgot-password',
          element: <ForgotPass />,

        },
        {
          path: 'checkmail',
          element: <CheckMail />,

        },
        {
          path: 'reset-password/:token',
          element: <ResetPass />,

        },

        {
          path: 'stones',
          element: <Stones />
        },
        {
          path: 'stones/:pid',
          element: <StoneDetail />
        },
        {
          path: 'cart',
          element: <Cart />
        },
        {
          path: 'orders/:id/:oid',
          element: <OrderDetails />
        },
        {
          path: 'orders/review/:pid',
          element: <Feedback />
        },
        {
          path:'lagacy',
          element:<Legacy/>
        },
        {
          path: 'profile',
          element: <Profile />,
          children: [
            {
              path: '',
              element: <EditProfile />
            },
            {
              path: 'orders',
              element: <MyOrder />
            },

            {
              path: 'address',
              element: <DeliveryAddress />
            }
          ]
        },
        {
          path: 'order/checkout',
          element: <Checkout />
        },
        {
          path: 'order/checkout/payment',
          element: <Payment />
        },
        {
          path: 'payment/paymentsuccess',
          element: <SuccessPayment />
        },
        {
          path: 'order/ordersuccess/:reference',
          element: <SuccessOrder />
        },

      ]
    },


    {
      path: "/admin",
      element: <AdminRoute />,
      children: [
        {
          path: "",
          element: <Dashboard />
        },
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'users',
          element: <Customer />
        },
        {
          path: 'diamonds',
          element: <Diamonds />
        },
        {
          path: 'feedback',
          element: <Reviews />
        },
        {
          path: 'order',
          element: <Order />
        },
        {
          path: 'addproduct',
          element: <AddDiamond />
        },
        {
          path: 'category',
          element: <Category />
        }

      ]

    },

    {
      path: "*",
      element: <Notfound />
    }

  ])

  return (

    <RouterProvider router={router}>


    </RouterProvider>

  )
}


export default App
