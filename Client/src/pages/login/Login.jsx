import React, { useState } from 'react'
import "./style.css"
import { useThemeHook } from '../../Global-Component/ThemeProvide'
import { NavLink } from "react-router-dom"
import { useFormik } from "formik"
import { loginSchema } from '../sign-up/Validate'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const init = {
  email: "", password: ""
}
const Login = ({ setLoginUser }) => {
  const theme = useThemeHook()

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: init,
    validationSchema: loginSchema,
    onSubmit: (values, action) => {


      console.log(values)
      axios.post("http://localhost:4001/login", values)
        .then((r) => {
          console.log(r)
          // alert (r.data.message)
          
          setLoginUser(r.data.user)
          navigate("/")
        })
        .catch(err => console.log(err))

      action.resetForm()
    }

  })

  const navigate = useNavigate();

  return (
    <div id="login" className={theme ? "bg-dark-2 text-light" : ""}>
      <form action=""
        onSubmit={handleSubmit}
        className={theme ? "bg-dark" : "bg-light"} >
        <h2 className='text-center'> Login Now</h2>

        <div className="form-con ">
          <input type="text"
            value={values.email}
            name='email'
            onBlur={handleBlur}
            onChange={handleChange}
            className={`form-controls ${theme ? "dark-input" : "bg-light"}`}
            placeholder='E-mail'
            autoComplete='off' />
          {errors.email && touched.email ? <p>{errors.email}</p> : null}
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
          {errors.password && touched.password ? <p>{errors.password}</p> : null}
        </div>

        <div className="form-con ">
          <button className='lsbtn' type='submit' >Login</button>


        </div>

        <div className="form-con">
          <label>New User ? <span> <NavLink to="/signup" className='lblToggle'>sign up</NavLink> </span></label>
        </div>
      </form>
    </div>
  )
}

export default Login
