import React, { useState } from 'react'
import "./style.css"
import { useThemeHook } from '../../Global-Component/ThemeProvide'
import { NavLink } from "react-router-dom"
import { useFormik } from "formik"
import { loginSchema } from '../sign-up/Validate'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import toast,{Toaster} from "react-hot-toast"

const init = {
  email: "", password: ""
}
const Login = ({ setLoginUser }) => {


  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: init,
    validationSchema: loginSchema,
    onSubmit: (values, action) => {


      console.log(values)
      axios.post("http://localhost:4001/login", values)
        .then((r) => {
          console.log(r)
          if(r.status === 201){
           toast.success("Login succesfully")
           action.resetForm()
          }
          else if(r.status ===203){
            toast.error("Password not match !")
            values.password = ""
          }
          else if(r.status === 204){
            toast.error("User Not found !")
          }
          
          setLoginUser(r.data.user)
          navigate("/")
        })
        .catch(err => console.log(err))

      
    }

  })

  const navigate = useNavigate();

  return (
    <>
    
    
    <div id="login"  >
     
      <Toaster/>
    </div>

    <form action=""
        onSubmit={handleSubmit}
        className='bg-dark'
        id='login-form'
        >
        <h2 className='text-center'> Login Now</h2>

        <div className="form-con ">
          <input type="text"
            value={values.email}
            name='email'
            onBlur={handleBlur}
            onChange={handleChange}
         
            placeholder='E-mail'
             />
          {errors.email && touched.email ? <p>{errors.email}</p> : null}
        </div>

        <div className="form-con">
          <input type="password"
            value={values.password}
            name='password'
            onBlur={handleBlur}
            onChange={handleChange}
           
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

    </>
  )
}

export default Login
