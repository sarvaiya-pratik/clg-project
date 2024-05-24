import React, { useEffect } from 'react'
import "./style.css"
import { useLocation } from 'react-router-dom'
const CheckMail = () => {

  const { state } = useLocation()

  return (
    <div id="checkmail">

      <div className="main-container">

        <div className="container" >
          <div className="header">
            <div className="text">Reset Account Password</div>
            <div className="underline"></div>
          </div>
          <div className="content">

            {/* <h5>We sent you email with instruction to reset your password</h5> */}
            <h5>Check email for reset link</h5>
            <p>An email has been sent to <span style={{ fontWeight: 600 }}>{state?.email || "demo123@gmail.com"} </span>. Check the inbox of your email account, and click on reset link provided.</p>

            <span>This link will expire in 24h</span>

            {/* <button className='submit'>Resent link</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckMail