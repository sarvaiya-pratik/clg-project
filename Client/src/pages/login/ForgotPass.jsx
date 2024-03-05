import React, { useState } from 'react'
import "./style.css"
import axios from 'axios'
import {toast} from "react-toastify"

import { useNavigate } from "react-router-dom"
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineLock } from "react-icons/ai"
import Loader from '../../common/Loader/Loader'
const ForgotPass = () => {
  const [ForgateData, setForgateData] = useState()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  
  function handleLoginSubmit(e) {
    e.preventDefault()
    setLoading(true)

    axios.post("/users/forgot-password", { email: ForgateData })
      .then((r) => {
        if (r.status == 200) {
          setLoading(false)
          navigate('/checkmail',{state:{email:ForgateData}})
        }
        else {
          setLoading(false)
          toast.error(r.data.message)
        }
      }
      
      )
      .catch((err)=>{
        console.log(err)
        setLoading(false)
        toast.error(err.response.data.message)
      })
      

  }


  const handleShowPass = () => {
    setShowPass(!showPass)
  }
  return (
    loading ? <Loader /> :
      <>

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
                  onChange={(e) => setForgateData(e.target.value)}
                />
              </div>

              <div className="forgate-password"> <span onClick={() => navigate("/login")} >Back Login page</span></div>

              <div className="submit-container">
                <button type='submit' className="submit">Submit</button>

              </div>
            </form>
          </div>
        </div>

      </>
  )
}

export default ForgotPass;
