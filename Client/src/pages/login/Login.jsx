import React, { useState } from 'react'
import "./style.css"
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast"
import Header from '../../common/Header/Header'
import Footer from '../../common/Footer/Footer'
import { useNavigate } from "react-router-dom"
import Loader from '../../common/Loader/Loader'
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineLock } from "react-icons/ai"
const Login = () => {
  const [loginData, setLoginData] = useState({})
  const [regData, setRegData] = useState({})
  const [action, setAction] = useState("Login")
  const [showPass, setShowPass] = useState(true)
  const [loading,setLoading] = useState(false)
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
    setLoading(true)
    console.log(regData)
    axios.post("/user/login", loginData)
      .then((r) => {
        if (r.data.status == "success") {
          localStorage.setItem('uname', r.data.uname)
          localStorage.setItem('token', r.data.token)
          try {
            toast.success(r.data.message)
            setLoading(false)
            navigate("/")
            window.location.reload()
          } catch (error) {
            console.log("error in token")
          }
        }
        else if (r.data.status = "Noactive") {
          setLoading(false)
          toast.error(r.data.message)
        }
        else {
          setLoading(false)
          toast.error(r.data.message)
        }
      })

  }

  function handleRegSubmit(e) {
    e.preventDefault();
    setLoading(true)
    console.log("REG", regData)
    axios.post("/user/register", regData)
      .then((r) => {
        if (r.data.status == "success") {
          try {
            setLoading(false)
            toast.success(r.data.message)
            localStorage.setItem('token', r.data.token)
            localStorage.setItem('uname', r.data.uname)

            navigate("/")
          } catch (error) {

            console.log("error in token")
          }
        }
        else {
          setLoading(false)
          toast.error(r.data.message)
        }
      })
  }
  const handleShowPass = () => {
    setShowPass(!showPass)
  }
  return (
    loading ? <Loader/> :
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
                <input type="text" placeholder='Email' name="email" required
                  onChange={handleLogin}
                  value={loginData.email}
                />
              </div>
              <div className="input" >
                <AiOutlineLock />
                <input type={showPass ? "text" : "password"} value={loginData.password} placeholder='Password' name="password" autoComplete='off'
                  onChange={handleLogin} />
                {showPass ? <AiFillEye size="1.4rem" onClick={handleShowPass} style={{ cursor: 'pointer' }} /> : <AiFillEyeInvisible size="1.4rem" onClick={handleShowPass} style={{ cursor: 'pointer' }} />}
              </div>
              <div className="forgate-password" >Lost password ? <span onClick={()=>navigate("/login/reset-password/getotp")} >click here</span></div>

              <div className="submit-container">
                <button type='submit' className="submit" 
                onClick={() =>{ 
                 
                  setAction("Login")
              }}>Login</button>
                <button type='submit' className="submit gray" onClick={() =>{
                  setRegData({email:"",name:"",phone:"",password:"",capssword:""})
                  setAction("Sign Up")
                }}>Sign  Up</button>
              </div>
            </form>
            :
            //Sign up
            <form className="inputs" onSubmit={handleRegSubmit}>
              <div className="input" >
                <AiOutlineUser />
                <input type="text" name='name' placeholder='Name'
                maxLength={20}
                value={regData.name}
                  onChange={handleReg} />
              </div>

              <div className="input" >
                <AiOutlineMail />
                <input type="eamil" placeholder='Email Id'
                  name='email'
                  required
                  value={regData.email}
                  onChange={handleReg} />
              </div>
              <div className="input" >
                <AiOutlinePhone />
                <input type="number" placeholder='phone'
                  name='phone'
                  value={regData.phone}
                 onInput={(e)=>e.target.value=e.target.value.slice(0,10)}
                  required
                  onChange={handleReg} />
              </div>
              <div className="input" >
                <AiOutlineLock />
                <input type="password" placeholder='New Pasword'
                  name='password'
                  required
                  value={regData.password}
                  onChange={handleReg} />
              </div>
              <div className="input">
                <AiOutlineLock />
                <input type={showPass ? "text" : "password"} placeholder='Confirm Password'
                  name='cpassword'
                  required
                  value={regData.cpassword}
                  onChange={handleReg} />
                {/* <input type="checkbox" onClick={handleShowPass} style={{ width: '30px', height: '30px', marginRight: '20px' }} /> */}
                {showPass ? <AiFillEye size="1.4rem" onClick={handleShowPass} style={{ cursor: 'pointer' }} /> : <AiFillEyeInvisible size="1.4rem" onClick={handleShowPass} style={{ cursor: 'pointer' }} />}
              </div>
              <div className="submit-container">
                <button type='submit' className="submit" onClick={() => setAction("Sign Up")}>Sign Up</button>
                <button type='submit' onSubmit={() => handleLoginSubmit} className="submit gray" onClick={() => {
                  console.log("login",loginData)
                  console.log("reg",regData)
                  setLoginData({email:"",password:""})
                  setAction("Login")
                }}>Login</button>
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
