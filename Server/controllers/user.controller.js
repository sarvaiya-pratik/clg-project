
import { getUserByToken } from "../config/tokenProvider.js"
import Address from "../models/address.model.js"
import User from "../models/user.model.js"


const getAllUser = async (req, res) => {
    try {
        const user = await User.find().populate('address')
        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {

        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

const getCurrentUser = async (req, res) => {
    console.log("run get currrent ")
    try {

        if (req.user) {
            const user = await User.findById(req.user._id).populate("address")
            return res.status(200).json({ user: user, success: true })
        }

        return res.status(404).json({ success: false, message: "User not found !" })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}


const updateUser = async (req, res) => {
    try {
        const { name, phone, gender, dob, isAdmin, } = req.body
        const userId = req.params.uid

        if (!userId) {
            return res.status(404).json({ success: false, message: "UserId not found !" })
        }

        const user = await User.findByIdAndUpdate(userId, { name, phone, dob, gender, dob, isAdmin }, { new: true })
        await user.save()
        res.status(200).json({ success: true, message: "Updated succesfully", user })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }

}

const updateAdress = async (req, res) => {
    try {
        const { firstname, lastname, street, city, pincode, state } = req.body
        const userId = req.params.uid

        const user = await User.findById(userId).populate('address')
        // console.log("user", user)
        // Check if the user already has an address
        const existingAddressId = user.address.length > 0 ? user.address[0] : null;

        if (existingAddressId) {

            const existingAddress = await Address.findById(existingAddressId)



            if (!existingAddress) {
                res.status(404).json({ success: false, message: "Address Not found" })
            }
            await Address.findByIdAndUpdate(existingAddress._id, { fname: firstname, lname: lastname, streetAddress: street, city, pincode, state }, { new: true })
            // Update the existing address
            // existingAddress.fname = firstname
            // existingAddress.lname = lastname
            // existingAddress.streetAddress = street
            // existingAddress.city = city
            // existingAddress.pincode = pincode
            // existingAddress.state = state
            // await existingAddress.save();

            res.status(200).json({ success: true, message: "Address updated", user })




        }
        // Create a new address 
        const newAddress = new Address({
            fname: firstname,
            lname: lastname,
            streetAddress: street,
            city,
            state,
            pincode,
            phone: user.phone,
            email: user.email,
            user: user._id
        });

        const savedAddress = await newAddress.save();


        // Update the user's address array with the new address ObjectId
        user.address.push(savedAddress._id);

        // Save the user with the updated address array
        const updatedUser = await user.save();

        console.log('User updated with new address:', updatedUser);
        res.status(200).json({ success: true, message: "Address updated", user: updatedUser })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (user) {
            return res.status(200).json({ success: true, user });
        }

        return res.status(404).json({ success: false, message: "User not found" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
};
const deleteUser = async (req, res) => {

    const userId = req.params.id
    
    try {

        // await User.findByIdAndDelete(userId)
        // await User.findByIdAndUpdate(userId,{active: !active})
        // const user = await User.findByIdAndUpdate(userId, { $set: { active: { $ne: true } } }, { new: true })
        const user = await User.findById(userId);
        user.active = !user.active;
        await user.save()
        
        console.log(user);
        res.status(200).json({ success: true, message: "Deleted Succesfully", user })
        // const user = await User.find().populate("address")
        console.log(user)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}


export { getAllUser, getCurrentUser, updateUser, updateAdress, getUserById, deleteUser }