import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// user registration
export const userSignUP = createAsyncThunk("auth/userSignUP", async(data) => {
    try {
        const response = await axios.post(`/api/v1/auth/signup`, data,{
            withCredentials: true
        })

        console.log(response.data);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

// user sign in
export const userSignIn = createAsyncThunk("auth/userSignIn", async(data) => {
    try {
        const response = await axios.post(`/api/v1/auth/sign-in`, data, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})


// user log out
export const logoutUser = createAsyncThunk("auth/logoutUser", async() => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/auth/logout`, "", {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})


// Get logged in user
export const getLoggedInUser = createAsyncThunk("auth/getLoggedInUser", async() => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/auth/me`, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})