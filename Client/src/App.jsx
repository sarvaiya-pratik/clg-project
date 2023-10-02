import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./app.css"

import Home from "./pages/home/Home"
import About from "./pages/about/About"
import Service from "./pages/service/Service"
import Stones from "./pages/stones/Stones"
import Login from "./pages/login/Login"

import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import StoneDetail from "./pages/stones/StoneDetail"
import Admin from "./pages/admin/Admin"
import axios from "axios"
import AdminLogin from "./pages/admin/AdminLogin/AdminLogin"

import Loader from "./common/Loader/Loader"
import Cart from "./pages/cart/Cart"
import Spinner from "./pages/login/Spinner"

import Order from "./pages/cart/address/Order"

const App = () => {
  // const [user, setLoginUser] = useState({ _id: 12 })
  const [jdata, setJdata] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
    callapi()
    console.log("Bar bar")
  }, [])

  const callapi = async () => {
    await axios.get("http://localhost:4001/product")
      .then((res) => {
        setJdata(res.data)
        setLoad(false)
      })
      .catch(err => "Error in json data(Pratik)" + err)
  }

  return (
    <>
      <Toaster />
      {load ? <Loader /> :
        <Router>

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/stones" element={<Stones data={jdata} />}></Route>
            <Route path="/stones/:id" element={<StoneDetail data={jdata} />}></Route>
            <Route path="/admin" element={< AdminLogin />} />
            <Route path="/admins/*" element={<Admin data={jdata} />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/spi" element={<Spinner />}></Route>
            <Route path="/order" element={<Order />}></Route>
          </Routes>

        </Router>

      }

    </>
  )
}


export default App
