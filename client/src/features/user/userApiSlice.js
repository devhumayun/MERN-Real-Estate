import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get all Permission
export const getAllPermission = createAsyncThunk("user/getAllPermission", async() => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/permissions/`,{
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})


// Create new Permission
export const createPermission = createAsyncThunk("user/createPermission", async(data) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/permissions/`, data,{
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})


// Delete Permission
export const deletePermission = createAsyncThunk("user/deletePermission", async(id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/permissions/${id}`,{
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})


//  Permission Status Update
export const permissionStatusUpdate = createAsyncThunk("user/permissionStatusUpdate", async({id,status}) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/permissions/status/${id}`,
        {status},
        {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

// Get all Role
export const getAllRole = createAsyncThunk("user/getAllRole", async() => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/role/`,{
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})


// Create new Role
export const createRole = createAsyncThunk("user/createRole", async(data) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/role`, data,{
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

// Delete Role
export const deleteRole = createAsyncThunk("user/deleteRole", async(id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/role/${id}`,{
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

//  role Status Update
export const roleStatusUpdate = createAsyncThunk("user/roleStatusUpdate", async({status,id}) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/role/status/${id}`,
        {status},
        {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})


//  role update
export const roleEditUpdate = createAsyncThunk("user/roleEditUpdate", async(data) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/v1/role/${data.id}`,
        data,
        {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

// Get all Users
export const getAllUsers = createAsyncThunk("user/getAllUsers", async() => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/user/`,{
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

// Create user
export const createUser = createAsyncThunk("user/createUser", async(data) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/user`, data,{
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

// Delete User
export const deleteUser = createAsyncThunk("user/deleteUser", async(id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/user/${id}`,{
            withCredentials: true
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})