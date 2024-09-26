import { Other } from "../models/other.model.js";

export const getColor = async (req, res) => {
    try {

        const color = await Other.find({}).select("color")

        console.log(color)
        res.status(200).json({ success: true, color: color })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}


export const addColor = async (req, res) => {
    try {
        const { color } = req.body;
        const isData = await Other.find()
        const isColor = await Other.findOne({ color })

        if (isColor) {
            return res.status(401).json({ success: false, message: "color alrady Exist" })
        }

        if (isData.length == 0) {
            const newColor = new Other({ color })
            await newColor.save()
            return res.status(201).json({ success: true, color: newColor, message: "color added succesfully" })
        }
        let _id = isData[0]._id

        await Other.updateOne({ _id }, { $push: { color: color } })

        const allcolor = await Other.find({}).select("color")
        return res.status(201).json({ success: true, color: allcolor, message: "color added succesfully" })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const updateColor = async (req, res) => {
    try {
        const oldColor = req.params.color
        const { newColor } = req.body;

        console.log(oldColor, newColor)

        const isColor = await Other.findOne({ color: oldColor })
        if (!isColor) {
            return res.status(401).json({ success: false, message: "color not found bro !" })
        }

        await Other.findOneAndUpdate(
            { color: oldColor },
            { $pull: { color: oldColor } }
        )

        await Other.findOneAndUpdate(
            { color: { $ne: newColor } },
            { $addToSet: { color: newColor } }
        );


        //  await Other.findOneAndUpdate({}, { $pull: { color},$push:{color:newColor}})


        const allcolor = await Other.find({}).select("color")
        return res.status(200).json({ success: true, color: allcolor })


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }

}
export const deleteColor = async (req, res) => {
    try {
        const color = req.params.color


        const isColor = await Other.findOne({ color })

        if (!isColor) {
            return res.status(401).json({ success: false, message: "color not found  !" })
        }

        await Other.findOneAndUpdate(
            { color },
            { $pull: { color: color } }
        )
        const allcolor = await Other.find({}).select("color")
        return res.status(200).json({ success: true, color: allcolor })


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }

}



// Clarity

export const getClarity = async (req, res) => {

    try {
        const color = await Other.find({}).select("clarity")
        console.log(color)
        res.status(200).json({ success: true, color: color })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}




export const addClarity = async (req, res) => {
    try {
        const { color } = req.body;
        const isData = await Other.find()
        const isColor = await Other.findOne({ clarity: color })
        console.log(color)
        if (isColor) {
            return res.status(403).json({ success: false, message: "clarity alrady Exist" })
        }

        if (isData.length == 0) {
            const newColor = new Other({ clarity: color })
            await newColor.save()
            return res.status(201).json({ success: true, color: newColor, message: "clarity added succesfully" })
        }
        let _id = isData[0]._id

        await Other.updateOne({ _id }, { $push: { clarity: color } })

        const allcolor = await Other.find({}).select("clarity")
        return res.status(201).json({ success: true, color: allcolor, message: "clarity added succesfully" })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const updateClarity = async (req, res) => {

    try {
        const oldColor = req.params.clarity
        const { newColor } = req.body;

        const isColor = await Other.findOne({ clarity: oldColor })
        if (!isColor) {
            return res.status(404).json({ success: false, message: "clarity not found bro !" })
        }

        await Other.findOneAndUpdate(
            { clarity: oldColor },
            { $pull: { clarity: oldColor } }
        )

        await Other.findOneAndUpdate(
            { clarity: { $ne: newColor } },
            { $addToSet: { clarity: newColor } }
        );

        const allcolor = await Other.find({}).select("clarity")
        return res.status(200).json({ success: true, color: allcolor })


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}


export const deleteClarity = async (req, res) => {
    try {
        const color = req.params.clarity
        const isColor = await Other.findOne({ clarity: color })

        if (!isColor) {
            return res.status(404).json({ success: false, message: "clarity not found  !" })
        }

        await Other.findOneAndUpdate(
            { clarity: color },
            { $pull: { clarity: color } }
        )
        const allcolor = await Other.find({}).select("clarity")
        return res.status(200).json({ success: true, color: allcolor })


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }

}

// Cut

export const getCut = async (req, res) => {

    try {
        const color = await Other.find({}).select("cut")
        console.log(color)
        res.status(200).json({ success: true, color: color })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}
export const addCut = async (req, res) => {
    try {
        const { color } = req.body;
        const isData = await Other.find()
        const isColor = await Other.findOne({ cut: color })
        
        if (isColor) {
            return res.status(403).json({ success: false, message: "clarity alrady Exist" })
        }

        if (isData.length == 0) {
            const newColor = new Other({ cut: color })
            await newColor.save()
            return res.status(201).json({ success: true, color: newColor, message: "clarity added succesfully" })
        }
        let _id = isData[0]._id

        await Other.updateOne({ _id }, { $push: { cut: color } })

        const allcolor = await Other.find({}).select("cut")
        return res.status(201).json({ success: true, color: allcolor, message: "clarity added succesfully" })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const updateCut = async (req, res) => {

    try {
        const oldColor = req.params.cut
        const { newColor } = req.body;

        const isColor = await Other.findOne({ cut: oldColor })
        if (!isColor) {
            return res.status(404).json({ success: false, message: "clarity not found bro !" })
        }

        await Other.findOneAndUpdate(
            { cut: oldColor },
            { $pull: { cut: oldColor } }
        )

        await Other.findOneAndUpdate(
            { cut: { $ne: newColor } },
            { $addToSet: { cut: newColor } }
        );

        const allcolor = await Other.find({}).select("cut")
        return res.status(200).json({ success: true, color: allcolor })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}


export const deleteCut = async (req, res) => {
    try {
        const color = req.params.cut
        const isColor = await Other.findOne({ cut: color })

        if (!isColor) {
            return res.status(404).json({ success: false, message: "cut not found  !" })
        }

        await Other.findOneAndUpdate(
            { cut: color },
            { $pull: { cut: color } }
        )
        const allcolor = await Other.find({}).select("cut")
        return res.status(200).json({ success: true, color: allcolor })


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }

}





// Polish
export const getpolish = async (req, res) => {

    try {
        const color = await Other.find({}).select("polish")
        console.log(color)
        res.status(200).json({ success: true, color: color })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}
export const addpolish = async (req, res) => {
    try {
        const { color } = req.body;
        const isData = await Other.find()
        const isColor = await Other.findOne({ polish: color })
        // console.log(polish)
        if (isColor) {
            return res.status(403).json({ success: false, message: "polish alrady Exist" })
        }

        if (isData.length == 0) {
            const newColor = new Other({ polish: color })
            await newColor.save()
            return res.status(201).json({ success: true, color: newColor, message: "polish added succesfully" })
        }
        let _id = isData[0]._id

        await Other.updateOne({ _id }, { $push: { polish: color } })

        const allcolor = await Other.find({}).select("polish")
        return res.status(201).json({ success: true, color: allcolor, message: "polish added succesfully" })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const updatepolish = async (req, res) => {

    try {
        const oldColor = req.params.polish
        const { newColor } = req.body;

        const isColor = await Other.findOne({ polish: oldColor })
        if (!isColor) {
            return res.status(404).json({ success: false, message: "Polish not found bro !" })
        }

        await Other.findOneAndUpdate(
            { polish: oldColor },
            { $pull: { polish: oldColor } }
        )

        await Other.findOneAndUpdate(
            { polish: { $ne: newColor } },
            { $addToSet: { polish: newColor } }
        );

        const allcolor = await Other.find({}).select("polish")
        return res.status(200).json({ success: true, color: allcolor })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}


export const deletepolish = async (req, res) => {
    try {
        const color = req.params.polish
        const isColor = await Other.findOne({ polish: color })

        if (!isColor) {
            return res.status(404).json({ success: false, message: "polish not found  !" })
        }

        await Other.findOneAndUpdate(
            { polish: color },
            { $pull: { polish: color } }
        )
        const allcolor = await Other.find({}).select("polish")
        return res.status(200).json({ success: true, color: allcolor })


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }

}


// summetry

export const getsummetry = async (req, res) => {

    try {
        const color = await Other.find({}).select("summetry")
        console.log(color)
        res.status(200).json({ success: true, color: color })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}
export const addsummetry = async (req, res) => {
    try {
        const { color } = req.body;
        const isData = await Other.find()
        const isColor = await Other.findOne({ summetry: color })
        // console.log(summetry)
        if (isColor) {
            return res.status(403).json({ success: false, message: "summetry alrady Exist" })
        }

        if (isData.length == 0) {
            const newColor = new Other({ summetry: color })
            await newColor.save()
            return res.status(201).json({ success: true, color: newColor, message: "summetry added succesfully" })
        }
        let _id = isData[0]._id

        await Other.updateOne({ _id }, { $push: { summetry: color } })

        const allcolor = await Other.find({}).select("summetry")
        return res.status(201).json({ success: true, color: allcolor, message: "summetry added succesfully" })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const updatesummetry = async (req, res) => {

    try {
        const oldColor = req.params.summetry
        const { newColor } = req.body;

        const isColor = await Other.findOne({ summetry: oldColor })
        if (!isColor) {
            return res.status(404).json({ success: false, message: "summetry not found bro !" })
        }

        await Other.findOneAndUpdate(
            { summetry: oldColor },
            { $pull: { summetry: oldColor } }
        )

        await Other.findOneAndUpdate(
            { summetry: { $ne: newColor } },
            { $addToSet: { summetry: newColor } }
        );

        const allcolor = await Other.find({}).select("summetry")
        return res.status(200).json({ success: true, color: allcolor })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}


export const deletesummetry = async (req, res) => {
    try {
        const color = req.params.summetry
        const isColor = await Other.findOne({ summetry: color })

        if (!isColor) {
            return res.status(404).json({ success: false, message: "summetry not found  !" })
        }

        await Other.findOneAndUpdate(
            { summetry: color },
            { $pull: { summetry: color } }
        )
        const allcolor = await Other.find({}).select("summetry")
        return res.status(200).json({ success: true, color: allcolor })


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }

}



