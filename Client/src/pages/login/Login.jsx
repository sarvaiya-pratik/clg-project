import React, { useState } from 'react'
import "./style.css"
import axios from 'axios'

// import { NavLink } from "react-router-dom"

// import { loginSchema } from '../sign-up/Validate'
// import axios from 'axios'
// import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"


const Login = () => {
  const [loginData, setLoginData] = useState({})
  const [regData, setRegData] = useState({})


  function handleReg(e) {
   
  
    setRegData({ ...regData, [e.target.name]: e.target.value })
  }

  function handleLogin(e){
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

function handleLoginSubmit(e){
  e.preventDefault();
  axios.post("http://localhost:4001/login",loginData)
  .then((r)=>{
    if(r.status == 204){
      toast.success(r.data.message)
    }
   console.log("Pratik"+r.status)
  })
}

function handleRegSubmit(e){
  e.preventDefault();
 axios.post("http://localhost:4001/register",regData)
  .then((r)=>{
    if(r.status === "204"){
      alert(r.data.message)
    }
    toast.success(r.data.message)
  })
}

  return (
    <>
<Toaster/>
      <div className="mylogin">



        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="login">
            <form className="form" onSubmit={handleLoginSubmit}>
              <label htmlFor="chk" aria-hidden="true">Log in</label>
              <input className="input" type="email"
                name="email"
                placeholder="Email"
                onChange={handleLogin}
                required="" />
              <input className="input" type="password"
                name="password"
                placeholder="Password"
                onChange={handleLogin}
                required="" />
              <button type='submit'>Log in</button>
            </form>
          </div>

          <div className="register">
            <form className="form" onSubmit={handleRegSubmit}>
              <label htmlFor="chk" aria-hidden="true">Register</label>
              <input className='input' name='name'
                onChange={handleReg}



                type="text"
                placeholder='Full Name' />
              <input className='input' name='email'
                onChange={handleReg}
                type="text"
                placeholder=' mail' />

              <input className='input' name='phone'
                onChange={handleReg}
                type="text"
                placeholder='Phone No' />

              <input className='input' name='password'
                onChange={handleReg}
                autoComplete='off'
                type="password"

                placeholder='Password' />

              <input className='input' name='cpassword'
                onChange={handleReg}
                autoComplete='off'
                type="password"
                placeholder='confirm password' />
              <button type='submit'>Register</button>
            </form>
          </div>
        </div>

      </div>


    </>
  )
}

export default Login
