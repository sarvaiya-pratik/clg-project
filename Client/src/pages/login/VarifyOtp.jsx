import React, { useState, useRef } from 'react'
import "./style.css"
import Header from '../../common/Header/Header'
import Footer from '../../common/Footer/Footer'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Loader from '../../common/Loader/Loader'
export const VarifyOtp = () => {

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const [digits, setDigits] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }

  };

  const handleBackspace = (event, index) => {
    if (event.key === 'Backspace' && index > 0 && digits[index] === '') {
      inputRefs[index - 1].current.focus();
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    axios.post("/users/auth/verify", { digits })
      .then((r) => {
        if (r.data.code == 200) {
          setLoading(false)
          toast.success(r.data.message)
          navigate("/login/reset-password/reset")
        }
        else {
          setLoading(false)
          toast.error(r.data.message)
        }
      })
  }
  const handleResent = (e) => {
    setLoading(true)
    e.preventDefault()
    axios.get("/users/auth/resend")
      .then((r) => {
        if (r.data.code == 200) {
          setLoading(false)

          toast.success(r.data.message)
        }
        else {
          setLoading(false)
          toast.error(r.data.message)
        }
      })
  }
  return (
    loading ? <Loader /> :
      <>
        <Header />
        <div className="main-otp-form">
          <form className="otp-Form" >
            <span className="mainHeading">Enter OTP</span>
            <p className="otpSubheading">We have sent a verification code to your Email</p>
            <div className="inputContainer">
              {digits.map((digit, index) => (

                <input maxlength="1" type="number" className="otp-input"
                  key={index}

                  onInput={(e) => e.target.value = e.target.value.slice(0, 1)}
                  maxLength="1"
                  value={digit}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  onChange={(e) => handleInputChange(e, index)}
                  ref={inputRefs[index]} />
              ))}

            </div>
            <button className="verifyButton" type="submit" onClick={handleSubmit}>Verify</button>

            <p className="resendNote">Didn't receive the code? <button className="resendBtn" onClick={handleResent}>resent here</button></p>

          </form>
        </div>


        <Footer />
      </>
  )
}
