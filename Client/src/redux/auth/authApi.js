import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";


export const createUser = createAsyncThunk('createuser', async (data) => {
    try {
        const response = await axios.post('/users/auth/signup', data, { withCredentials: true });

        // Assuming the API returns an error object in case of failure
        console.log(response.data)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("catch run", error)
        throw error.response.data;

    }
});

export const loginUser = createAsyncThunk('login', async (data) => {
    try {
        const response = await axios.post('/users/auth/signin', data, { withCredentials: true });

        if (response.status === 200) {
            return response.data;

        }
    } catch (error) {
        if (error.response) {

            throw error.response.data;
        }

    }
});

export const loginWithGoogle = createAsyncThunk('loginWitGoogle', async () => {
    try {
        const response = await axios.get('http://localhost:5050/users/login/success', { withCredentials: true });
        console.log(response.data.user)
        if (response.status === 200) {
            return response.data
        } 
    } catch (error) {
        
        throw error.response.data
    }
});

