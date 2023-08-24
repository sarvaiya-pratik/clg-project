import React, { useState } from 'react'
import "./style.css"
import axios from 'axios'

import toast, { Toaster } from "react-hot-toast"
import Header from '../../common/Header/Header'
import Footer from '../../common/Footer/Footer'
import { useNavigate } from "react-router-dom"
import { AiOutlineUser,AiOutlineMail,AiOutlinePhone,AiOutlineLock} from "react-icons/ai"

const Login = () => {
  const [loginData, setLoginData] = useState({})
  const [regData, setRegData] = useState({})
  const [action, setAction] = useState("Login")
  const [showPass,setShowPass] = useState("password")

  const navigate = useNavigate();
  function handleReg(e) {

    setRegData({ ...regData, [e.target.name]: e.target.value })
  }
  function handleLogin(e) {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  function handleLoginSubmit(e) {
    e.preventDefault()
    axios.post("http://localhost:4001/login", loginData)
      .then((r) => {
        if (r.data.status == "success") {

          localStorage.setItem('uname', r.data.uname)
          localStorage.setItem('token', r.data.token)

          try {
            toast.success(r.data.message)

            navigate("/")
            window.location.reload()
          } catch (error) {
            console.log("error in token")
          }
        }
        else {
          toast.error(r.data.message)
        }
      })

  }

  function handleRegSubmit(e) {
    e.preventDefault();
    console.log("REG", regData)
    axios.post("http://localhost:4001/register", regData)
      .then((r) => {
        if (r.data.status == "success") {

          try {
            toast.success(r.data.message)
            localStorage.setItem('token', r.data.token)
            localStorage.setItem('uname', r.data.uname)

            navigate("/")
          } catch (error) {
            console.log("error in token")
          }
        }


        else {
          toast.error(r.data.message)
        }
      })
  }

  const handleShowPass=()=>{
    setShowPass(showPass=="password"?"text":"password")
  }

  return (
    <>
      <Header />

      <div className="main-container">



        <div className="container">
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
          {action === "Login" ?
            <form className="inputs" onSubmit={handleLoginSubmit} >
              <div className="input">
                <AiOutlineUser />
                <input type="text" placeholder='Email' name="email"
                  onChange={handleLogin}
                />
              </div>
              <div className="input" >
                <AiOutlineLock />
                <input type="password" placeholder='Password' name="password"
                  onChange={handleLogin} />
              </div>
              <div className="forgate-password">Lost password ? <span>click here</span></div> 

              <div className="submit-container">
                <button type='submit' className="submit gray" onClick={() => setAction("Sign Up")}>Sign Up</button>
                <button type='submit' className="submit" onClick={() => setAction("Login")}>Login</button>
              </div>
            </form>
            :
            //Sign up
            <form className="inputs" onSubmit={handleRegSubmit}>

              <div className="input" >
                <AiOutlineUser />
                <input type="text" name='name' placeholder='Name'
                  onChange={handleReg} />
              </div>

              <div className="input" >
                <AiOutlineMail />
                <input type="eamil" placeholder='Email Id'
                  name='email'
                  onChange={handleReg} />
              </div>
              <div className="input" >
                <AiOutlinePhone />
                <input type="text" placeholder='phone'
                  name='phone'
                  onChange={handleReg} />
              </div>
              <div className="input" >
                <AiOutlineLock />
                <input type="password"  placeholder='New Pasword'
                  name='password'
                  onChange={handleReg} />
              </div>
              <div className="input">
                <AiOutlineLock />
                <input type={showPass} placeholder='Confirm Password'
                  name='cpassword'
                  onChange={handleReg} />
                  <input type="checkbox" onClick={handleShowPass} style={{width:'30px',height:'30px',marginRight:'20px'}}/>
              </div>
              <div className="submit-container">
                <button type='submit' className="submit" onClick={() => setAction("Sign Up")}>Sign Up</button>
                <button type='submit' onSubmit={() => handleLoginSubmit} className="submit gray" onClick={() => setAction("Login")}>Login</button>
              </div>
            </form>
          }
        

        </div>


      </div>









     
      <Footer />
    </>
  )
}

export default Login
