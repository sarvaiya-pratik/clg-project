import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getalluser = createAsyncThunk('users/all', async () => {
    try {
        const res = await axios.get('/users', { withCredentials: true })
        return res.data

    } catch (error) {
        throw error
    }
})

export const getUserById = createAsyncThunk('users/by-ID', async (id) => {
    try {
        const res = await axios.get(`/users/ID/${id}`, { withCredentials: true })
        return res.data

    } catch (error) {
        throw error
    }
})

export const getusercurrent = createAsyncThunk('/users/currentuser', async () => {
    console.log("run current")
    try {
        const response = await axios.get('/users/currentuser', { withCredentials: true })
   console.log(response)
        if (response.status === 200) {
           
            return response.data
        } 

    } catch (error) {
        console.log("Errorrrr",error)
        throw  error.response.data.error

    }
})

export const updateuser = createAsyncThunk('users/update', async ({ updatedUser, uid }) => {
    try {
        const response = await axios.put(`/users/update/${uid}`, updatedUser)
        return response.data


    } catch (error) {
        throw error
    }
})
export const updateuseraddress = createAsyncThunk('users/update/address', async ({ addressData, uid }) => {
    try {
        const response = await axios.put(`/users/update/address/${uid}`, addressData)
        console.log("response", response.data)
        return response.data

    } catch (error) {
        throw error
    }
})

export const deleteUser = createAsyncThunk('users/delete', async ( id ) => {
    try {
        const response = await axios.delete(`/users/remove/${id}`,{withCredentials:true})
        console.log("response", response.data)
        return response.data

    } catch (error) {
        throw error
    }
})



