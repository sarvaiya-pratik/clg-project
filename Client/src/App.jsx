import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./app.css"

import Home from "./pages/home/Home"
import About from "./pages/about/About"
import Service from "./pages/service/Service"
import Stones from "./pages/stones/Stones"
import Login from "./pages/login/Login"
import Signup from "./pages/sign-up/Signup"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import StoneDetail from "./pages/stones/StoneDetail"
import Admin from "./pages/admin/Admin"
import axios from "axios"
import AdminLogin from "./pages/admin/AdminLogin/AdminLogin"
import Loader from ".././src/common/Loader/Loader"
const App = () => {
  // const [user, setLoginUser] = useState({ _id: 12 })
  const [jdata, setJdata] = useState([])
  const [load, setLoad] = useState(false)
  console.log(jdata)

  useEffect(() => {
    setLoad(true)
    callapi()

  }, [])

  const callapi = async () => {
    await axios.get("http://localhost:4001/getproduct")
      .then((res) => {
        setJdata(res.data)
        setLoad(false)
      })
      .catch(err => "Error in json data(Pratik)" + err)

  }
  console.log(jdata)

  return (
    <>
      {load ? <Loader /> :
        <Router>

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/stones" element={<Stones data={jdata} />}></Route>
            <Route path="/stones/:id" element={<StoneDetail data={jdata} />}></Route>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admins/*" element={<Admin />}></Route>
          </Routes>

        </Router>

      }

    </>
  )
}


export default App
