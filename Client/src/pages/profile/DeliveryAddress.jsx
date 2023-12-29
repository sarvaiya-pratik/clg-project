import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getusercurrent, updateuseraddress } from '../../redux/user/userApi';
import Loader from '../../common/Loader/Loader';
import {toast} from 'react-toastify';

const DeliveryAddress = () => {
    const user = useSelector((state) => state.user.users);
    const error = useSelector((state) => state.user.error);
    const loading = useSelector((state) => state.user.loading);

    const [addressData, setAddressData] = useState({
        firstname: user?.address[0]?.fname || '',
        lastname: user?.address[0]?.lname || '',
        street: user?.address[0]?.streetAddress || '',
        city: user?.address[0]?.city || '',
        state: user?.address[0]?.state || '',
        pincode: user?.address[0]?.pincode || '',
    })

    const dispatch = useDispatch()


    useEffect(() => {
        if (user) {
console.log(user)
            setAddressData({
                firstname: user?.address[0]?.fname || "",
                lastname: user?.address[0]?.lname || "",
                street: user?.address[0]?.streetAddress || "",
                city: user?.address[0]?.city || "",
                state: user?.address[0]?.state || "",
                pincode: user?.address[0]?.pincode || ""
            });
        }
    }, [user, loading,dispatch]);

 

    const handleChange = (e) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value })
    }

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const uid = user && user._id;

        try {

            dispatch(updateuseraddress({ addressData, uid }));


            if (!error) {
                toast.success("Address updated successfully");
                setTimeout(() => {
                    dispatch(getusercurrent())
                }, 500);

            } else {

                toast.error("Error updating address");
            }
        } catch (error) {
            console.error("Error updating address:", error);
        }
    };


    return (
        <>


            {
                loading ? <Loader /> :

                    <div className="right-side">
                        <div className="heading-edit-profile">
                            Delivery Address
                        </div>
                        <form action="" onSubmit={handleSubmit}>
                            <TextField id="outlined-basic" label="First Name" variant="standard" name='firstname' value={addressData.firstname} onChange={handleChange} />
                            <TextField id="outlined-basic" label="Last Name" variant="standard" name='lastname' value={addressData.lastname} onChange={handleChange} />
                            <TextField id="outlined-basic" label="Address (Area and Street)" variant="standard" value={addressData.street} name='street' onChange={handleChange} />
                            <TextField id="outlined-basic" label="City" variant="standard" name='city' value={addressData.city} onChange={handleChange} />
                            <TextField id="outlined-basic" label="Pin Code" variant="standard" name='pincode' value={addressData.pincode} onChange={handleChange} />
                            {/* <TextField id="outlined-basic" label="State" variant="standard" name='email' onChange={handleChange} /> */}
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">State</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    onChange={handleChange}
                                    label="State"
                                    name='state'
                                    value={addressData.state}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Gujarat">Gujarat</MenuItem>
                                    <MenuItem value="Junagadh">Mumbai</MenuItem>
                                    <MenuItem value="Navasari">Delhi</MenuItem>
                                </Select>
                            </FormControl>

                            <Button type='submit' variant="contained" style={{ marginTop: '1rem' }}>Save Address</Button>
                        </form>

                    </div>
            }
        </>
    )
}

export default DeliveryAddress