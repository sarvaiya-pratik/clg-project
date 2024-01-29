import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUserById, getalluser, getusercurrent, updateuser, updateuseraddress } from "./userApi";

const initialState = {
    users: null,
    loading: false,
    error: null
}
const userSlice = createSlice({
    name: "user",
    initialState,
   reducers:{
    logout:(state,action)=>{
        state.users = null
        state.loading =false
    }
   },
   extraReducers:(builder)=>{
    builder.addCase(getalluser.pending,(state,action)=>{
        state.loading=true
        state.error = null
    })
    builder.addCase(getalluser.fulfilled,(state,action)=>{
        state.loading=false
        state.users = action.payload.user
        
    })
    builder.addCase(getalluser.rejected,(state,action)=>{
        state.loading=false
        state.users = null
        state.error = action.error.message
    })
    .addCase(getusercurrent.pending,(state,action)=>{
       
         state.loading = true
         state.users = null
         state.error=null
     })
     .addCase(getusercurrent.fulfilled,(state,action)=>{
         state.loading = false
         state.users=action.payload.user
         state.error=null
     })
     .addCase(getusercurrent.rejected,(state,action)=>{

         state.loading = false
         state.err=action.error.message
         state.users=null
     })
    .addCase(updateuser.pending,(state,action)=>{
       
         state.loading = true
         state.users = null
         state.error=null
     })
     .addCase(updateuser.fulfilled,(state,action)=>{
         state.loading = false
         state.users=action.payload.user
         state.error=null
     })
     .addCase(updateuser.rejected,(state,action)=>{

         state.loading = false
         state.err=action.error.message
         state.users=null
     })


    .addCase(updateuseraddress.pending,(state,action)=>{
       
         state.loading = true
         state.users = null
         state.error=null
     })
     .addCase(updateuseraddress.fulfilled,(state,action)=>{
         state.loading = false
         state.users=action.payload.user
         state.error=null
     })
     .addCase(updateuseraddress.rejected,(state,action)=>{

         state.loading = false
         state.err=action.error.message
         state.users=null
     })

    .addCase(deleteUser.pending,(state,action)=>{
       
         state.loading = true
         state.users = null
         state.error=null
     })
     .addCase(deleteUser.fulfilled,(state,action)=>{
         state.loading = false
         state.users=action.payload.user
         state.error=null
     })
     .addCase(deleteUser.rejected,(state,action)=>{

         state.loading = false
         state.err=action.error.message
         state.users=null
     })

    .addCase(getUserById.pending,(state,action)=>{
       
         state.loading = true
         state.users = null
         state.error=null
     })
     .addCase(getUserById.fulfilled,(state,action)=>{
         state.loading = false
         state.users=action.payload.user
         state.error=null
     })
     .addCase(getUserById.rejected,(state,action)=>{

         state.loading = false
         state.err=action.error.message
         state.users=null
     })


   }
})

// export const {logout} = userSlice.actions

export default userSlice.reducer

