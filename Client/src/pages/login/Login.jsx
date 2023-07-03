import React, { useState } from 'react'
import "./style.css"
import { useThemeHook } from '../../Global-Component/ThemeProvide'
import { NavLink } from "react-router-dom"
import { useFormik } from "formik"
import { loginSchema } from '../sign-up/Validate'
import axios from 'axios'

const init ={
  uname:"", password:""
}
const Login = () => {
  const theme = useThemeHook()

  const {values,errors,handleBlur,handleChange,handleSubmit,touched}  =useFormik({
    initialValues:init,
    validationSchema:loginSchema,
    onSubmit:()=>{
      alert("Login Success")
      console.log(values)
      axios.post("http://localhost:4001/login",values)
      .then(r=>console.log(r))
      .catch(err=>console.log(err))
    }

  })

  return (
    <div id="login" className={theme ? "bg-dark-2 text-light" : ""}>
      <form action=""
        onSubmit={handleSubmit}
        className={theme ? "bg-dark" : "bg-light"} >
        <h2 className='text-center'> Login Now</h2>

        <div className="form-con ">
          <input type="text"
          value={values.uname}
            name='uname'
            onBlur={handleBlur}
            onChange={handleChange}
            className={`form-controls ${theme ? "dark-input" : "bg-light"}`}
            placeholder='Username'
            autoComplete='off' />
            {errors.uname && touched.uname ? <p>{errors.uname}</p>:null}
        </div>

        <div className="form-con">
          <input type="password"
          value={values.password}
            name='password'
            onBlur={handleBlur}
            onChange={handleChange}
            className={`form-controls ${theme ? "dark-input" : "bg-light"}`}
            placeholder='Password'
            autoComplete='off' />
            {errors.password && touched.password ? <p>{errors.password}</p>:null}
        </div>

        <div className="form-con ">
          <button className='lsbtn' type='submit'>Login</button>
        </div>

        <div className="form-con">
          <label>New User ? <span> <NavLink to="/signup" className='lblToggle'>sign up</NavLink> </span></label>
        </div>
      </form>
    </div>
  )
}

export default Login
