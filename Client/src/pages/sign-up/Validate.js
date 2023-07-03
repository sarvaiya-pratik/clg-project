import * as Yup from "yup"

export const signUpSchema = Yup.object({
    fname:Yup.string().min(2).max(25).required("Please enter your first name"),
    lname:Yup.string().min(2).max(25).required("Please enter your last name"),
    email:Yup.string().email().required("Please enter your email"),
    uname:Yup.string().required("Please enter your uname"),
    password:Yup.string().min(4).required("Please enter your password"),
    cpassword:Yup.string()
        .required()
        .oneOf([Yup.ref('password'),null],"password must match"),
})


export const loginSchema = Yup.object({
    uname:Yup.string().min(2).required("Please enter uname"),
    password:Yup.string().min(4).required("Please enter Password")
})

// const Validate=(val)=>{
//     let err ={}
//     const email_patten = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     // const password_patten = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z][a-zA-Z0-9]{8,})$/
    
//     if(val.email === ""){
//         err.email = "Email should not be empty"
//     }
//     else if(!email_patten.test(val.email)){
//         err.email = "Enter valid Email"
//     }
//     if(val.password === ""){
//         err.password = "password  should not be empty"
//     }
//     // if(!password_patten.test(val.password)){
//     //     err.password = "password must me 8 char"
//     // }
//     else if(String(val.cpassword) === "" || String(val.password) !== String(val.cpassword)){
//         err.cpassword = "Password did't matched"
//     }

//     return err;
// }

// export default Validate
