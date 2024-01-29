import React, { useEffect, useState } from 'react'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import dayjs from "dayjs";
import { useDispatch, useSelector } from 'react-redux';
import { getusercurrent, updateuser } from '../../redux/user/userApi';
import Alert from '@mui/material/Alert';
import {toast} from 'react-toastify'
import Loader from '../../common/Loader/Loader';
// ... (import statements remain unchanged)

const EditProfile = () => {
    // const [user, setUser] = useState()

    const user = useSelector((state) => state.user.users);
    const error = useSelector((state) => state.user.error);
    const loading = useSelector((state) => state.user.loading);

    const dispatch = useDispatch();


    const [profiledata, setProfileData] = useState({
        name: user && user.name,
        phone: user && user.phone,
        email: user && user.email,
        gender: user && user.gender,
        dob: user ? dayjs(user.dob) : null, // Convert to Dayjs
    })


    useEffect(() => {
        if (user) {
          

            setProfileData({
                name: user.name || '',
                phone: user.phone || '',
                email: user.email || '',
                gender: user.gender || '',
                dob: user.dob ? dayjs(user.dob) : null,
            });
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const uid = user && user._id;
        dispatch(updateuser({ updatedUser: profiledata, uid }));
        if (!error) {

            toast.success("Updated succesfully!")
            setTimeout(() => {
                dispatch(getusercurrent())
                
            }, 500);
        }
    };

    const handleChange = (e) => {
        setProfileData({
            ...profiledata,
            [e.target.name]: e.target.value,
        });
    };

    const handleDate = (date) => {
        setProfileData({
            ...profiledata,
            dob: date,
        });
    };

    return (
        <>
            {
                loading ? <Loader /> :
                    <div className="right-side">
                        <div className="heading-edit-profile">Edit Profile Details</div>
                        <form action="" onSubmit={handleSubmit}>
                           
                            <TextField
                                id="outlined-basic"
                                label="Full Name"
                                variant="standard"
                                name="name"
                                value={profiledata.name}
                                onChange={handleChange}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Mobile Number"
                                variant="standard"
                                name="phone"
                                value={profiledata.phone}
                                onChange={handleChange}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                disabled
                                variant="standard"
                                value={profiledata.email}
                                name="email"
                            />
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="gender"
                                    value={profiledata.gender}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Date of Birth</FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    {/* Render the DatePicker component */}
                                    <DatePicker
                                        value={profiledata.dob}
                                        onChange={handleDate}
                                        renderInput={(props) => (
                                            // Use a TextField for an editable input
                                            <TextField {...props} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                            <Button type="submit" variant="contained" style={{ marginTop: '1rem' }}>
                                Save Changes
                            </Button>
                        </form>

                    </div>
            }
        </>
    );
};

export default EditProfile;
