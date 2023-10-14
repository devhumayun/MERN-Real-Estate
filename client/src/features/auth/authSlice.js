import { createSlice } from "@reduxjs/toolkit";
import { userSignIn, userSignUP } from "./authApiSlice";


// create a auth slice
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        message: null,
        error: null,
        loader: false
    },
    reducers: {
        setMessageEmpty: (state) => {
           state.message = null 
           state.error = null 
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userSignUP.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(userSignUP.fulfilled, (state,action) => {
            state.message = action.payload.message
        })
        .addCase(userSignIn.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(userSignIn.fulfilled, (state,action) => {
            state.message = action.payload.message
            state.user = action.payload.user
        })

    }
})

// selector
export const getAuthData = state => state.auth

// actions
export const { setMessageEmpty } = authSlice.actions

// export
export default authSlice.reducer