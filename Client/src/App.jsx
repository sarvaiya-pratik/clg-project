import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./app.css"
import Header from "./common/Header/Header"
import Footer from "./common/Footer/Footer"
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

const App = () => {
  // const [user, setLoginUser] = useState({ _id: 12 })
  const [jdata, setJdata] = useState([])
  console.log(jdata)
  useEffect(() => {

    callapi()
  }, [])

  const callapi = async () => {
    await axios.get("http://localhost:4001/api/data")
      .then((res) => {
        setJdata(res.data)
      })
      .catch(err => "Error in json data(Pratik)" + err)
  }

  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* <Route path="/" element={user && user._id ? <Home setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />}></Route> */}
          <Route path="/" element={<Home/>} /> 
          {/* <Route path="/about" element={user && user._id ? <About /> : <Login setLoginUser={setLoginUser} />}> </Route> */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/stones" element={<Stones data={jdata} />}></Route>
          <Route path="/stones/:id" element={<StoneDetail data={jdata} />}></Route>
        {/* <Routes path="/admin" element={<Admin />} /> */}
        </Routes>
        <Footer />


      </Router>
      <Toaster />

    </>
  )
}


export default App
