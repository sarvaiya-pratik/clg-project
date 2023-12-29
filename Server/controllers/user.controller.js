
import { getUserByToken } from "../config/tokenProvider.js"
import Address from "../models/address.model.js"
import User from "../models/user.model.js"

const getAllUser = async (req, res) => {
    try {
        const user = await User.find()
        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        return res.status(500).send(error)
    }
}

const getCurrentUser = async (req, res) => {
    try {
       
        if(req.user){
            const user = await User.findById(req.user._id).populate("address")
            return res.status(200).json({ user: user, success: true })
        }
        else{
            console.log("User not found")
            res.status(404).send('User not found')
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
}

const updateUser = async (req, res) => {
    const { firstName, lastName, mobileNo, gender, dob } = req.body
    const userId = req.params.uid
    let name = firstName + " " + lastName;

    try {
        const user = await User.findByIdAndUpdate(userId, { name, phone: mobileNo, dob, gender })
        await user.save()
        res.status(200).json({ success: true, message: "Updated succesfully", user })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }

}

const updateAdress = async (req, res) => {
    const { firstname, lastname, street, city, pincode, state } = req.body
    console.log("val",firstname, lastname, street, city, pincode, state )
    const userId = req.params.uid
    try {
        // Find the user (assuming you already have a user saved or create one first)
        const user = await User.findById(userId).populate('address')
        console.log("user", user)
        // Check if the user already has an address
        const existingAddressId = user.address.length > 0 ? user.address[0] : null;

        if (existingAddressId) {
            const existingAddress = await Address.findById(existingAddressId)

            if (existingAddress) {
                // Update the existing address
                existingAddress.fname = firstname
                existingAddress.lname = lastname
                existingAddress.streetAddress = street
                existingAddress.city = city
                existingAddress.pincode = pincode
                existingAddress.state = state
                const updatedAddress = await existingAddress.save();

                console.log('Address updated successfully:', updatedAddress);
                res.status(200).json({ success: true, message: "Address updated", user })

            }
            else {

                res.status(404).json({ success: false, message: "Not found" })
            }


        } else {
            // Create a new address instance
            const newAddress = new Address({
                fname: firstname,
                lname: lastname,
                streetAddress: street,
                city,
                state,
                pincode,
                user: user._id
            });

            // Save the new address to the database
            const savedAddress = await newAddress.save();

            console.log('New Address saved successfully:', savedAddress);

            // Update the user's address array with the new address ObjectId
            user.address.push(savedAddress._id);

            // Save the user with the updated address array
            const updatedUser = await user.save();

            console.log('User updated with new address:', updatedUser);
            res.status(200).json({ success: true, message: "Address updated", user:updatedUser })
        }
    } catch (error) {
        console.error('Error:', error);
    }


}
export { getAllUser, getCurrentUser, updateUser, updateAdress }