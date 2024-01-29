import React, { useState } from 'react'
import "./style.css"
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast"
import Header from '../../common/Header/Header'
import Footer from '../../common/Footer/Footer'
import { useNavigate } from "react-router-dom"
import { AiOutlineUser } from 'react-icons/ai'
import { FaSlash } from 'react-icons/fa'
import Loader from '../../common/Loader/Loader'

const ResetPass = () => {
  const [password, setPassword] = useState()
  const [cpassword, setCPassword] = useState()
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate();
  function handleLoginSubmit(e) {
    setLoading(true)
    e.preventDefault()
    if (password == cpassword) {
      axios.post("/users/auth/reset", { password })
        .then((r) => {
          if (r.data.code == 200) {
            setLoading(false)
            toast.success(r.data.message)
            navigate("/login")
          }
          else {
            setLoading(false)
            toast.error(r.data.message)
          }
        })

    }

    else {
      setLoading(false)
      toast.error("Password not same !")
    }
  }


  const handleShowPass = () => {
    setShowPass(!showPass)
  }
  return (
    loading ? <Loader /> :
      <>
        <Header />
        <div className="main-container">

          <div className="container" >
            <div className="header">
              <div className="text">Reset Your Password !</div>
              <div className="underline"></div>
            </div>

            <form className="inputs" onSubmit={handleLoginSubmit} >
              <div className="input">
                <AiOutlineUser />
                <input type="password" placeholder='New Password' name="email" required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input">
                <AiOutlineUser />
                <input type="password" placeholder='Confirm New Password' name="email" required
                  onChange={(e) => setCPassword(e.target.value)}
                />
              </div>


              <div className="submit-container">
                <button type='submit' className="submit">Confirm</button>

              </div>
            </form>
          </div>
        </div>
        <Footer />
      </>
  )
}

export default ResetPass;
