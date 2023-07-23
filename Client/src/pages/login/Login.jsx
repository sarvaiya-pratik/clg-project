import React, { useState } from 'react'
import "./style.css"

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
    
    <div className="mylogin">

  
    
    <div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true"/>

			<div class="login">
				<form class="form">
					<label for="chk" aria-hidden="true">Log in</label>
					<input class="input" type="email" name="email" placeholder="Email" required=""/>
					<input class="input" type="password" name="pswd" placeholder="Password" required=""/>
					<button>Log in</button>
				</form>
			</div>

      <div class="register">
				<form class="form">
					<label for="chk" aria-hidden="true">Register</label>
					<input className='input' name='fname'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fname}
             
                type="text"
                placeholder=' First Name' />  
      <input className='input' name='email'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            type="text"
          
            placeholder=' Email' />
             

<input className='input' name='phone'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            type="text"
          
            placeholder='Phone No' />
             
 <input className='input' name='password'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            autoComplete='off'
            type="password"
           
            placeholder='Password' />
             
 <input className='input' name='cpassword'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.cpassword}
            autoComplete='off'
            type="password"
           
            placeholder='confirm password' />
					<button>Register</button>
				</form>
			</div>
	</div>

  </div>

    {/* <form action=""
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
      </form> */}

    </>
  )
}

export default Login
