import mongoose from "mongoose"


const connectDb = async(URL)=>{
    try {
        mongoose.connect(URL)
        .then(()=>{
            console.log("Connected")
        })
    } catch (error) {
        console.log(error)
    }
}
export default connectDb