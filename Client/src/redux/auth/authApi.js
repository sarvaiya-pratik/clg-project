import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const createUser = createAsyncThunk('createuser', async (data) => {
    try {
        const response = await axios.post('/users/auth/signup', data, { withCredentials: true });

        // Assuming the API returns an error object in case of failure

        if (response.status === 200) {
            return response.data;
        } else {
            throw response.data.error
        }
    } catch (error) {
        throw error;
    }
});

export const loginUser = createAsyncThunk('login', async (data) => {
    try {
        const response = await axios.post('/users/auth/signin', data, { withCredentials: true });

        if (response.status === 200) {
            return response.data;
        } else {

            throw response.data.error
        }
    } catch (error) {
        throw error;
    }
});

export const loginWithGoogle = createAsyncThunk('loginWitGoogle', async () => {
    try {
        const response = await axios.get('http://localhost:5050/users/login/success', { withCredentials: true });
        console.log(response.data.user)
        if (response.status === 200) {
            return response.data
        } else {

            throw response.data.error
        }
    } catch (error) {
        throw error;
    }
});

