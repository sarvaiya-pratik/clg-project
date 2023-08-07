require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const cookieParser = require("cookie-parser")
const mydata = require("./data.json")
const DataModel = require('./models/mydata')
app.use(cors())

app.use(bodyParser.json())
app.use(cookieParser())
const Router = require("./Routers/Users")

app.get('/api/data', (req, res) => {
    res.json(mydata);
})
app.get('/readmydata',async(req,res)=>{
    const data = await DataModel.find();
    console.log('data is ',data[0])
    res.send(data)
})
app.post('/mydata', async (req, res) => {
    const { stokeid,
        catagory,
        title,
        threesixty,
        shape,
        price,
        carat,
        colour,
        clarity,
        cut,
        polish,
        symmetry,
        fluorescence,
        measurements,
        table,
        depth,
        ratio,
        crownangle,
        crownheight,
        pavilionangle,
        paviliondepth,
        girdle,
        culet } = req.body;

    let doc = await new DataModel({
        stokeid,
        catagory,
        title,
        threesixty,
        shape,
        price,
        carat,
        colour,
        clarity,
        cut,
        polish,
        symmetry,
        fluorescence,
        measurements,
        table,
        depth,
        ratio,
        crownangle,
        crownheight,
        pavilionangle,
        paviliondepth,
        girdle,
        culet
    })
    doc.save();

    res.send("Record insert successfully")

})


// mongo connect
app.use("/", Router)

mongoose.connect(process.env.URLATLAS);

app.listen(process.env.PORT, () => {
    console.log("You are running on PORT", process.env.PORT)
})









