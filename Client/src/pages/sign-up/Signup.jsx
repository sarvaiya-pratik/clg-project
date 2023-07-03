import React, { useState } from 'react'
import "./style.css"
import { Col } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useThemeHook } from '../../Global-Component/ThemeProvide'
import { useFormik } from "formik"
import { signUpSchema } from './Validate'
import axios from 'axios'
const init = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  cpassword: "",
  uname: "",

}
const Signup = () => {
  const theme = useThemeHook()

  const { values, errors,touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: init,
    validationSchema: signUpSchema,
    onSubmit: (values,action) => {
      console.log(values)
      action.resetForm();
      alert("Successfully registered")
      axios.post("http://localhost:4001/register",values)
      .then((r)=>console.log(r))
      .catch((err)=>console.log("Axios bc",err))
    }
  })



  return (
    <>
      <div id="signup" className={theme ? "bg-dark-2 text-light" : ""}>
        <form action="" method='POST'
          className={theme ? "bg-dark" : "bg-light"}
          onSubmit={handleSubmit} >

          <h2 className='text-center'> Register Now</h2>
          <div className="form-con">
            <div className='flname '>
              <Col >
                <input name='fname'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fname}
                  className={`form-controls ${theme ? "dark-input" : "bg-light"}`}
                  type="text"
                  placeholder=' First Name' />
                  {errors.fname && touched.fname ? 
                  <p>{errors.fname}</p>:null}

              </Col>
              <Col >
                <input name='lname'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lname}
                  className={`form-controls ${theme ? "dark-input" : "bg-light"}`}
                  type="text"
                  placeholder=' Last Name' />
                   {errors.lname && touched.lname ? 
                  <p>{errors.lname}</p>:null}
              </Col>
            </div>
          </div>

          <div className="form-con ">
            <input name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              type="text"
              className={`form-controls ${theme ? "dark-input" : "bg-light"}`}
              placeholder=' Email' />
               {errors.email && touched.email ? 
                  <p>{errors.email}</p>:null}

          </div>

          <div className="form-con ">
            <input name='uname'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.uname}
              type="text"
              className={`form-controls ${theme ? "dark-input" : "bg-light"}`}
              placeholder='Set Username' />
               {errors.uname && touched.uname ? 
                  <p>{errors.uname}</p>:null}
          </div>
          <div className="form-con">
            <input name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              autoComplete='off'
              type="password"
              className={`form-controls ${theme ? "dark-input" : "bg-light"}`}
              placeholder='Password' />
               {errors.password && touched.password ? 
                  <p>{errors.password}</p>:null}


          </div>
          <div className="form-con">
            <input name='cpassword'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cpassword}
              autoComplete='off'
              type="password"
              className={`form-controls ${theme ? "dark-input" : "bg-light"}`}
              placeholder='confirm password' />
               {errors.cpassword && touched.cpassword ? 
                  <p>{errors.cpassword}</p>:null}

          </div>



          <div className="form-con ">
            <button type='submit' className='lsbtn'>sign up</button>
          </div>
          <div className="form-con">
            <label>Have an Account ?
              <span>
                <NavLink to="/login" className='lblToggle' >Login</NavLink>
              </span>
            </label>
          </div>

        </form>
      </div>

    </>
  )
}

export default Signup
