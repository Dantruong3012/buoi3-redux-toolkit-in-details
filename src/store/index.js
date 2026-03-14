import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/UserSlices";
import { albumReducer } from "./slices/AlbumSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    albums: albumReducer,
  },
});

export * from "./thunks/fetchUser";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";
export * from "./thunks/addAlbums";
