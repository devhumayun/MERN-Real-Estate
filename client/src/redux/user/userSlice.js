import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  curentUser: null,
  message: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.curentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    signInFailed: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
    updateProfileStart: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.curentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    updateProfileFailed: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});

export const { signInStart, signInSuccess, signInFailed, updateProfileStart, updateProfileSuccess, updateProfileFailed } = userSlice.actions;
export default userSlice.reducer;
