import { createSlice } from "@reduxjs/toolkit";
import { FetchUser } from "../thunks/fetchUser";
import { AddUser } from "../thunks/addUser";
import { RemoveUser } from "../thunks/removeUser";
const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    ///
  },
  extraReducers(builder) {
    builder.addCase(FetchUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(FetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(FetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // ADD USER
    builder.addCase(AddUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(AddUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(AddUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // remove user
    builder.addCase(RemoveUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(RemoveUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((user) => {return user.id !== action.payload.id});
    });
    builder.addCase(RemoveUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = userSlice.reducer;
