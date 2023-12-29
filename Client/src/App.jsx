import "react-toastify/dist/ReactToastify.css";
import "./app.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Suspense, lazy } from "react"


const Home = lazy(()=>import("./pages/home/Home"))
const Login = lazy(()=>import("./pages/login/Login"))
const Stones = lazy(()=>import("./pages/stones/Stones"))
const StoneDetail = lazy(()=>import("./pages/stones/StoneDetail"))
const Cart = lazy(()=>import("./pages/cart/Cart"))
const Profile = lazy(()=>import("./pages/profile/Profile"))
const Admin = lazy(()=>import("./pages/admin/Admin"))
const Dashboard = lazy(()=>import("./pages/admin/components/Dashboard"))
const Diamonds = lazy(()=>import("./pages/admin/components/Diamonds"))
const Message = lazy(()=>import("./pages/admin/components/Message"))
const Order = lazy(()=>import("./pages/admin/components/Order"))
const Customer = lazy(()=>import("./pages/admin/components/Cutomer"))
const AddDiamond = lazy(()=>import("./pages/admin/components/AddDiamond"))
const AdminRoute = lazy(()=>import("./pages/admin/AdminRoute"))
const Notfound = lazy(()=>import("./common/Error/Notfound"))
const Layout = lazy(()=>import("./Layout"))
const Checkout = lazy(()=>import("./pages/order/checkout"))
const SuccessPayment = lazy(()=>import("./pages/order/SuccessPayment"))
const EditProfile = lazy(()=>import("./pages/profile/EditProfile"))
const MyOrder = lazy(()=>import("./pages/profile/MyOrder"))
const DeliveryAddress = lazy(()=>import("./pages/profile/DeliveryAddress"))
const SuccessOrder = lazy(()=>import("./pages/order/SuccessOrder"))
const Payment = lazy(()=>import("./pages/order/Payment"))


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
          element: <Login />
        },
        {
          path: 'stones',
          element: <Stones />
        },
        {
          path: 'stones/:id',
          element: <StoneDetail />
        },
        {
          path: 'cart',
          element: <Cart />
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
          path: 'customer',
          element: <Customer />
        },
        {
          path: 'diamonds',
          element: <Diamonds />
        },
        {
          path: 'message',
          element: <Message />
        },
        {
          path: 'order',
          element: <Order />
        },
        {
          path: 'addproduct',
          element: <AddDiamond />
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
