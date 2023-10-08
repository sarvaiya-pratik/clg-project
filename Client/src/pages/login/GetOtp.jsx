import React, { useState } from 'react'
import "./style.css"
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast"
import Header from '../../common/Header/Header'
import Footer from '../../common/Footer/Footer'
import { useNavigate } from "react-router-dom"
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineLock } from "react-icons/ai"
import Loader from '../../common/Loader/Loader'
const GetOtp = () => {
  const [ForgateData, setForgateData] = useState({})
const [loading,setLoading] = useState(false)

 
  const navigate = useNavigate();
  function handleLoginSubmit(e) {
    e.preventDefault()
    setLoading(true)
  
    axios.post("http://localhost:4001/user/login/reset-password/getotp",{email:ForgateData})
      .then((r) => {
       if (r.data.code == 200 ){
         setLoading(false)
        toast.success(r.data.message)
        navigate("/login/reset-password/varify")
       }
       else{
        setLoading(false)
        toast.error(r.data.message)
       }
      })

  }

 
  const handleShowPass = () => {
    setShowPass(!showPass)
  }
  return (
    loading ? <Loader/>:
    <>
      <Header />
      <div className="main-container">

        <div className="container" >
          <div className="header">
            <div className="text">Forgate your Password ?</div>
            <div className="underline"></div>
          </div>
        
            <form className="inputs" onSubmit={handleLoginSubmit} >
              <div className="input">
                <AiOutlineUser />
                <input type="text" placeholder='Enter Your Email' name="email" required
                  onChange={(e)=>setForgateData(e.target.value)}
                />
              </div>

              <div className="forgate-password">go back ? <span onClick={()=>navigate("/login")} >click here</span></div>

              <div className="submit-container">
                <button type='submit' className="submit">Submit</button>
            
              </div>
            </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default GetOtp;