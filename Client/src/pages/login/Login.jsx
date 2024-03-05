import React, { useEffect, useState } from 'react'
import "./style.css"

import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineLock, AiOutlineGoogle } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { BiError } from 'react-icons/bi'
import { createUser, loginUser, loginWithGoogle } from '../../redux/auth/authApi'
import { TextField } from '@mui/material'
import { getusercurrent } from '../../redux/user/userApi'


const Login = () => {

  const [loginData, setLoginData] = useState({})
  const [regData, setRegData] = useState({})
  const [action, setAction] = useState("Login")
  const [showPass, setShowPass] = useState(true)

  const error = useSelector((state) => state.auth.err)
  const user = useSelector((state) => state.auth.users)
  const currentUserError = useSelector((state)=>state.user.error)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  // collect data from form  

  function handleReg(e) {
    setRegData({ ...regData, [e.target.name]: e.target.value })
  }
  function handleLogin(e) {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }


  function handleLoginSubmit(e) {
    e.preventDefault()
    dispatch(loginUser(loginData))
    dispatch(getusercurrent())

 
    // setTimeout(() => {
    //   window.location.reload()

    // }, 1000);

  }

  useEffect(() => {
    if (user && action == "Login" && !error && currentUserError ) {
      toast.success("Login successfully !")
      navigate("/")

      dispatch(getusercurrent())
    }
   
  }, [user])
  useEffect(() => {

    if (user && action == "Sign Up") {
      toast.success("Register successfully !")
      navigate("/")
      dispatch(getusercurrent())
    }
  }, [user])


  function handleRegSubmit(e) {
    e.preventDefault()

    dispatch(createUser(regData))

  }

  const handleGoogleClick = () => {
    window.open("http://localhost:5050/users/auth/google/callback", "_self");

    dispatch(loginWithGoogle())


  }

  const handleShowPass = () => {
    setShowPass(!showPass)
  }


  return (
    <>

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
                {showPass ? <AiFillEye className='eyesize' onClick={handleShowPass} style={{ cursor: 'pointer' }} /> : <AiFillEyeInvisible size="1.4rem" onClick={handleShowPass} style={{ cursor: 'pointer' }} />}
              </div>

              <p style={{ color: '#D8000C', backgroundColor: ' #FFBABA', width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px' }}>
                {error && <><BiError size={20} /> {error}</>}
                {/* {currentUserError && <><BiError size={20} /> {currentUserError}</>} */}


              </p>
              <div className="forgate-password" > <span onClick={() => navigate("/forgot-password")} >Forgot password?</span></div>

              <div className="submit-container">
                <button type='submit' className="submit"
                  onClick={() => {

                    setAction("Login")
                  }}>Login</button>
                <button type='submit' className="submit gray" onClick={() => {
                  setRegData({ email: "", name: "", phone: "", password: "", capssword: "" })
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
                  onInput={(e) => e.target.value = e.target.value.slice(0, 10)}
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
              <p style={{ color: '#D8000C', backgroundColor: ' #FFBABA', width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px' }}>{error && <><BiError size={20} /> {error}</>}</p>

              <div className="submit-container">
                <button type='submit' className="submit" onClick={() => setAction("Sign Up")}>Sign Up</button>
                <button type='submit' onSubmit={() => handleLoginSubmit} className="submit gray" onClick={() => {

                  setLoginData({ email: "", password: "" })
                  setAction("Login")
                }}>Login</button>
              </div>

            </form>
          }

          <hr />
          <div className="google">
            <button onClick={handleGoogleClick} className='google-btn'><AiOutlineGoogle size={20} />  Signup/Signin with Google</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login
