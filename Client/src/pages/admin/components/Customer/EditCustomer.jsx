import { Avatar, Box, Button, Drawer, FormControl, FormLabel, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateuser } from '../../../../redux/user/userApi'
import { toast } from 'react-toastify'
import { MdOutlineClose } from "react-icons/md";

const EditCustomer = ({ isOpen, handleDrawer }) => {

    const { users, loading, error } = useSelector((state) => state.user)

    const [user, setUser] = useState({
        id: users?._id,
        name: users?.name,
        email: users?.email,
        phone: users?.phone,
        gender: users?.gender,
        isAdmin: users?.isAdmin,
        dob: users ? dayjs(users.dob) : ""
    })

    const dispatch = useDispatch()
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }


    const handleDate = (date) => {
        setUser({
            ...user,
            dob: date
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let uid = user.id
        if (uid) {
            let updatedUser = user
            dispatch(updateuser({ updatedUser, uid }))
            if (!error) {
                toast.success("Updated succesfully")
                handleDrawer(false)
            }
        }
    }

    useEffect(() => {
        if (users) {
            setUser({
                id: users._id,
                name: users.name,
                email: users.email,
                phone: users.phone,
                gender: users.gender,
                isAdmin: users.isAdmin,

                dob: users ? dayjs(users.dob) : null
            })
        }

    }, [users])



    return (
        <>
            <Fragment key="right">
                <Drawer
                    anchor={'right'}
                    open={isOpen}
                    onClose={handleDrawer}
                >
                    <Box className="customer-drawer" id='main-drawer' sx={{ width: { xs: "90vw", md: '50vw' } }}>
                        <MdOutlineClose style={{ cursor: 'pointer' }} size={25} onClick={() => handleDrawer(false)} />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>

                            <h4 style={{ paddingLeft: '1rem', marginTop: '2rem' }}>Edit User</h4>

                            <Avatar src={users?.image} />

                        </Box>

                        <form action="" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '1rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexDirection: { xs: 'column', md: 'row' } }}>
                                <TextField label="Name" variant="outlined" name='name' value={user.name} onChange={handleChange} sx={{ flexBasis: '100%' }} />
                                <TextField label="Email" variant="outlined" name='email' value={user.email} onChange={handleChange} sx={{ flexBasis: '100%' }} />
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexDirection: { xs: 'column', md: 'row' } }}>
                                <TextField label="Phone" variant="outlined" name='phone' value={user.phone} onChange={handleChange} sx={{ flexBasis: '100%' }} />
                                <FormControl sx={{ flexBasis: '100%' }} variant='outlined' >
                                    <InputLabel>Gender</InputLabel>

                                    <Select onChange={handleChange} value={user.gender} name="gender" label="Gender">
                                        {/* <MenuItem value="none">None</MenuItem> */}
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexDirection: { xs: 'column', md: 'row' } }}>

                                <FormControl sx={{ flexBasis: '100%' }} variant='outlined'>
                                    {/* <FormLabel>Date of Birth</FormLabel> */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        {/* Render the DatePicker component */}
                                        <DatePicker
                                            label="Date of Birth"
                                            value={user.dob}
                                            onChange={handleDate}
                                            renderInput={(props) => (
                                                // Use a TextField for an editable input
                                                <TextField {...props} />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                                <FormControl sx={{ flexBasis: '100%' }} variant='outlined' >
                                    <InputLabel>Role</InputLabel>

                                    <Select name="isAdmin" onChange={handleChange} value={user.isAdmin} label="Role">

                                        <MenuItem value={true} >Admin</MenuItem>
                                        <MenuItem value={false}>User</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>



                            <Button type='submit' variant="contained" style={{ marginTop: '1rem' }} >Save User</Button>
                        </form>

                    </Box>
                </Drawer>
            </Fragment>
        </>
    )
}

export default EditCustomer