import { createSlice } from "@reduxjs/toolkit";
import { createPermission, createRole, createUser, deletePermission, deleteRole, deleteUser, getAllPermission, getAllRole, getAllUsers, permissionStatusUpdate, roleEditUpdate, roleStatusUpdate } from "./userApiSlice";


// create a auth slice
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        message: null,
        error: null,
    },
    reducers: {
        setMessageEmpty: (state) => {
            state.message = null 
            state.error = null 
         }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPermission.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(getAllPermission.fulfilled, (state, action) => {
            state.permission = action.payload
        })
        .addCase(createPermission.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(createPermission.fulfilled, (state, action) => {
            state.permission = state.permission ?? []
            state.permission.push(action.payload.permission)
            state.message = action.payload.message
        })
        .addCase(deletePermission.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(deletePermission.fulfilled, (state, action) => {
            state.permission = state.permission.filter(
                (data) => data._id != action.payload.permission._id
            )
            state.message = action.payload.message
        })
        .addCase(permissionStatusUpdate.rejected, (state, action) => {
            state.error = action.error.message;
          })
          .addCase(permissionStatusUpdate.fulfilled, (state, action) => {
            state.permission[
              state.permission.findIndex(
                (data) => data._id == action.payload.permission._id
              )
            ] = action.payload.permission;
            state.message = action.payload.message;
          })
        // .addCase(permissionStatusUpdate.rejected, (state, action) => {
        //     state.error = action.error.message
        // })
        // .addCase(permissionStatusUpdate.fulfilled, (state, action) => {
        //     state.permission[state.permission.findIndex((data) => data._id == action.payload.permission._id)] = action.payload.permission
        //     state.message = action.payload.message
        // })
        .addCase(getAllRole.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(getAllRole.fulfilled, (state, action) => {
            state.role = action.payload
        })
        .addCase(createRole.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(createRole.fulfilled, (state, action) => {
            state.permission = state.permission ?? []
            state.role.push(action.payload.role)
            state.message = action.payload.message
        })
        .addCase(deleteRole.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(deleteRole.fulfilled, (state, action) => {
            state.role = state.role.filter(
                (data) => data._id != action.payload.role._id
            )
            state.message = action.payload.message
        })
        .addCase(roleStatusUpdate.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(roleStatusUpdate.fulfilled, (state, action) => {
            state.role[state.role.findIndex((data) => data._id === action.payload.role._id)] = action.payload.role
            state.message = action.payload.message
        })
        .addCase(roleEditUpdate.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(roleEditUpdate.fulfilled, (state, action) => {
            state.role[state.role.findIndex((data) => data._id = action.payload.role._id)]
            state.message = action.payload.message
        })
        .addCase(createUser.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.user = state.user ?? []
            state.user.push(action.payload.user)
            state.message = action.payload.message
        })
        .addCase(getAllUsers.fulfilled, (state,action) => {
            state.user = action.payload
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.user = state.user.filter(
                (data) => data._id != action.payload.user._id
            )
            state.message = action.payload.message
        })
    }
})

// selector
export const getUserPermissionData = (state) => state.user

// actions
export const { setMessageEmpty } = userSlice.actions

// export
export default userSlice.reducer