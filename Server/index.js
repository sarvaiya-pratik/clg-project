require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const Jwt = require("jsonwebtoken")

app.use(cors())
app.use(bodyParser.json())

// mongo connect
const StudModel = require("./models/Student")
const {hashPassword,comparePassword} = require("./hepler/authHepler")


mongoose.connect(process.env.URLATLAS);

// api REGISTER || POST
app.post("/signup", async (req, res) => {
    const { fname, lname, email, phone, password } = req.body;
    const data = await StudModel.findOne({ email });
    if (data) {
        res.status(201).send({ message: "Email alreay exist" })
    }
    else {
        const hPassword =await hashPassword(password)
        const user =await  new StudModel({fname,lname,email,phone,password:hPassword}).save()
       res.status(200).send({
        success:true,
        message:"User register succesful"
       })
        
        
        
    }
})

// api LOGIN || POST

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await StudModel.findOne({email}) 
        console.log(user)
        if(!user){
            res.status(204).send({success:false,message:"User Not found !"});
        }


        const match =await comparePassword(password,user.password)
        if(!match){
           return res.status(203).send({success:false,message:"Invalid Password"})
        }
        else{
        //token 
        const token = await Jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:78})
        res.status(201).send({
            success:true,
            message:"login succesful",
            user,
            token,
        })
    }

    
    } catch (err) {
        console.log(err)
    }
})

app.listen(process.env.PORT, () => {
    console.log("You are running on PORT", process.env.PORT)
})


// await StudModel.create(req.body)
// .then(emp=>res.json(emp))
// .catch(err=>res.json(err))






