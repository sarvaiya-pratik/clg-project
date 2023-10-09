import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./app.css"

import Home from "./pages/home/Home"
import About from "./pages/about/About"
import Service from "./pages/service/Service"
import Stones from "./pages/stones/Stones"
import Login from "./pages/login/Login"
import GetOtp from "./pages/login/GetOtp"
import { VarifyOtp } from "./pages/login/VarifyOtp"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import StoneDetail from "./pages/stones/StoneDetail"
import Admin from "./pages/admin/Admin"
import axios from "axios"
import AdminLogin from "./pages/admin/AdminLogin/AdminLogin"
import ResetPass from "./pages/login/ResetPass"
import Loader from "./common/Loader/Loader"
import Cart from "./pages/cart/Cart"
import Spinner from "./pages/login/Spinner"
import Order from "./pages/cart/address/Order"
import  RefreshContextProvider from "./context/RefreshContextProvider"
axios.defaults.baseURL = "https://clg-server.onrender.com"
const App = () => {
  // const [user, setLoginUser] = useState({ _id: 12 })
  const [jdata, setJdata] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
    callapi()
   
  }, [])

  const callapi = async () => {
    await axios.get("/product")
      .then((res) => {
        setJdata(res.data)
        setLoad(false)
      })
      .catch(err => "Error in json data(Pratik)" + err)
  }

  return (
    <>
    <RefreshContextProvider>
      <Toaster />
      {/* {load ? <Loader /> : */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}>
            </Route>

            <Route path="/login/reset-password/getotp" element={<GetOtp />}></Route>
            <Route path="/login/reset-password/varify" element={<VarifyOtp />}></Route>
            <Route path="/login/reset-password/reset" element={<ResetPass />}></Route>

            <Route path="/stones" element={<Stones />}></Route>
            <Route path="/stones/:id" element={<StoneDetail  />}></Route>
            <Route path="/admin" element={< AdminLogin />} />
            <Route path="/admins/*" element={<Admin data={jdata} />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/spi" element={<Spinner />}></Route>
            <Route path="/order" element={<Order />}></Route>
          </Routes>

        </Router>
        

      {/* } */}
      </RefreshContextProvider>
    </>
  )
}


export default App
