import React, { Fragment, useEffect, useState } from 'react'
import Steps from './Steps'
import "./checkout.css"
import { Badge, Box, Breadcrumbs, Chip, Drawer, FormControl, FormControlLabel, FormLabel, InputLabel, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getusercurrent, updateuseraddress } from '../../redux/user/userApi'
import { BiCart, BiHome, BiMoney } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { FaRegAddressCard } from "react-icons/fa6";

const checkout = () => {
    const user = useSelector((state) => state.user.users);
    const error = useSelector((state) => state.user.error);
    const loading = useSelector((state) => state.user.loading);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [addressData, setAddressData] = useState({
        firstname: user?.address[0]?.fname || '',
        lastname: user?.address[0]?.lname || '',
        street: user?.address[0]?.streetAddress || '',
        city: user?.address[0]?.city || '',
        state: user?.address[0]?.state || '',
        pincode: user?.address[0]?.pincode || '',
    })
    const [state, setState] = useState(false);

    useEffect(() => {
        if (user) {
            setAddressData({
                firstname: user?.address[0]?.fname || "",
                lastname: user?.address[0]?.lname || "",
                street: user?.address[0]?.streetAddress || "",
                city: user?.address[0]?.city || "",
                state: user?.address[0]?.state || "",
                pincode: user?.address[0]?.pincode || ""
            });
        }
    }, [user, loading, dispatch]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const uid = user && user._id;
        try {
            dispatch(updateuseraddress({ addressData, uid }))

            toast.success("Address updated successfully")
            setTimeout(() => {
                dispatch(getusercurrent())
            }, 500);

        } catch (error) {
            console.error("Error updating address:", error);
        }
    }
    const handleChange = (e) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div id="checkout">
                <div role="presentation" style={{ marginLeft: '2rem', marginBottom: '2rem' }} >
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            onClick={() => navigate("/")}
                            underline="hover"
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="inherit"
                            style={{ cursor: 'pointer' }}
                        >
                            <BiHome sx={{ mr: 0.5 }} fontSize="inherit" />
                            Home
                        </Link>
                        <Link
                            onClick={() => navigate("/cart")}
                            underline="hover"
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="inherit"
                            style={{ cursor: 'pointer' }}

                        >
                            <BiCart sx={{ mr: 1.4 }} fontSize="inherit" />
                            Cart
                        </Link>

                        <Typography
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="text.primary"
                        >
                            <FaRegAddressCard sx={{ mr: 0.5 }} fontSize="inherit" />
                            Address
                        </Typography>
                    </Breadcrumbs>
                </div>

                <Steps mystep={1} />

                <div className="delivery-address">
                    {
                        user?.address.length > 0 ?
                            <div className="top-side">
                                <div className="address-card">
                                    <Chip label="Delivery Address" color='primary' style={{ position: 'absolute', top: '-20px' }} />
                                    <h5>{user?.address[0]?.fname + " " + user?.address[0].lname} </h5>
                                    <p>{user?.address[0]?.streetAddress}</p>
                                    <p>{user?.address[0]?.city + " - " + user?.address[0]?.pincode}</p>
                                    <div>
                                        <Fragment key="right">
                                            <Button onClick={() => setState(true)}>Edit</Button>
                                            <Drawer
                                                anchor={'right'}
                                                open={state}
                                                onClose={() => setState(false)}
                                            >
                                                <Box className="address-drawer" sx={{ width: 350 }}>
                                                    <h4 style={{ paddingLeft: '1rem', marginTop: '2rem' }}>Edit Address</h4>
                                                    <form action="" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '1rem' }}>
                                                        <TextField id="outlined-basic" label="First Name" variant="standard" name='firstname' value={addressData.firstname} onChange={handleChange} />
                                                        <TextField id="outlined-basic" label="Last Name" variant="standard" name='lastname' value={addressData.lastname} onChange={handleChange} />
                                                        <TextField id="outlined-basic" label="Address (Area and Street)" variant="standard" name='street' value={addressData.street} onChange={handleChange} />
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

                                                        <Button type='submit' variant="contained" style={{ marginTop: '1rem' }} onClick={() => setState(false)} >Save Address</Button>
                                                    </form>

                                                </Box>
                                            </Drawer>
                                        </Fragment>
                                        {/* ))} */}
                                    </div>

                                </div>


                            </div>
                            :
                            <div className="bottom-side">
                                <div className="heading-edit-profile">
                                    Enter Your Delivery Address
                                </div>
                                <form action="" onSubmit={handleSubmit}>
                                    <TextField id="outlined-basic" label="First Name" variant="standard" name='firstname' onChange={handleChange} />
                                    <TextField id="outlined-basic" label="Last Name" variant="standard" name='lastname' onChange={handleChange} />
                                    <TextField id="outlined-basic" label="Address (Area and Street)" variant="standard" name='street' onChange={handleChange} />
                                    <TextField id="outlined-basic" label="City" variant="standard" name='city' onChange={handleChange} />
                                    <TextField id="outlined-basic" label="Pin Code" variant="standard" name='pincode' onChange={handleChange} />
                                    {/* <TextField id="outlined-basic" label="State" variant="standard" name='email' onChange={handleChange} /> */}
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-standard-label">State</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            onChange={handleChange}
                                            label="State"
                                            name='state'

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


                </div>

                <div className="last-btns">
                    <Button color='primary' variant='contained' onClick={() => navigate("/cart")} >Go to Cart</Button>
                    <Button color='primary' disabled={user?.address.length > 0 ? false : true} variant='contained' onClick={() => navigate("/order/checkout/payment")}>Next</Button>
                </div>

            </div>





            {/*  */}



        </>
    )
}

export default checkout