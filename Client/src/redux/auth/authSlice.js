import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { createUser, loginUser, loginWithGoogle } from "./authApi";

const initialState = {
    users: null,
    loading: false,
    err: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.users = null
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.err = null
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.user
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.err = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.err = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {

                state.loading = false;
                state.users = action.payload.user
                state.err = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.err = action.error.message;
            })
            .addCase(loginWithGoogle.pending, (state, action) => {
                state.loading = true
                state.err = null
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload.user
                state.err = null
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.loading = false
                state.err = action.error.message
            })

    }
});

export const { selectError, selectUser, selectLoading } = (state) => state.auth

export const { logout } = authSlice.actions
export default authSlice.reducer;
