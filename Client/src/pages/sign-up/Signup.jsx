import React, { useState } from 'react'
import "./style.css"
import { Col } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useThemeHook } from '../../Global-Component/ThemeProvide'
import { useFormik } from "formik"
import { signUpSchema } from './Validate'
import axios from 'axios'
import toast,{Toaster} from "react-hot-toast"
const init = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  cpassword: "",
  phone: "",

}
const Signup = () => {

  const { values, errors,touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: init,
    validationSchema: signUpSchema,
    onSubmit: (values,action) => {
      console.log(values)
      

      axios.post("http://localhost:4001/signup",values)
      .then((r)=>{
        if(r.status === 200){
          toast.success("Register succesfully !")
          action.resetForm();
        }
        else if(r.status === 201){
          toast.error("Email already Exit !")
          values.email = ""
        }
        else{
          toast.error("Data not valid")
        }
      })
      .catch((err)=>console.log("Axios bc",err))
    }
  })

  return (
    <>
      <div id="signup">
       
      </div>

      <form id='signup-form' action="" method='POST'
        className='bg-dark'
        onSubmit={handleSubmit} >

        <h2 className='text-center'> Register Now</h2>
       
          <div className='form-con'>
           
              <input name='fname'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fname}
             
                type="text"
                placeholder=' First Name' />
                {errors.fname && touched.fname ? 
                <p>{errors.fname}</p>:null}

            </div>
            <div className='form-con'>
              <input name='lname'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lname}
              
                type="text"
                placeholder=' Last Name' />
                 {errors.lname && touched.lname ? 
                <p>{errors.lname}</p>:null}
            </div>
       
      

        <div className="form-con ">
          <input name='email'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            type="text"
          
            placeholder=' Email' />
             {errors.email && touched.email ? 
                <p>{errors.email}</p>:null}

        </div>

        <div className="form-con ">
          <input name='phone'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            type="text"
          
            placeholder='Phone No' />
             {errors.phone && touched.phone ? 
                <p>{errors.phone}</p>:null}
        </div>
        <div className="form-con">
          <input name='password'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            autoComplete='off'
            type="password"
           
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
              <Toaster/>
      </form>

    </>
  )
}

export default Signup
