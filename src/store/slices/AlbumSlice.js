import { createSlice } from "@reduxjs/toolkit";
import AddAlbum from "../thunks/addAlbums";
import { RemoveUser } from "../thunks/removeUser";
import { FetchAlbum } from "../thunks/fetchAlbum";

const albumSlice = createSlice({
  name: "albums",
  initialState: {
    data: [],
    isLoading: false,
    errorMsg: null,
  },
  reducers: {
    //
  },
  extraReducers(builder) {
    // ---------------- ADD ALBUM ----------------
    builder.addCase(AddAlbum.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(AddAlbum.fulfilled, (state, action) => {
      state.isLoading = false;
      // AddAlbum trả về 1 Object, nên dùng push bình thường là chuẩn
      state.data.push(action.payload);
    });
    builder.addCase(AddAlbum.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMsg = action.error;
    });

    // ---------------- FETCH ALBUM ----------------
    // builder.addCase(FetchAlbum.pending, (state, action) => {
    //   state.isLoading = true;
    // });

    // builder.addCase(FetchAlbum.fulfilled, (state, action) => {
    //   state.isLoading = false;

    //   if (action.payload.length === 0) return; // nothing to do

    //   const fetchedUserId = action.payload[0]?.userId;

    //   // Remove stale albums for this specific user, keep everyone else's
    //   state.data = state.data.filter((album) => album.userId !== fetchedUserId);

    //   // Add the fresh data from db.json
    //   state.data.push(...action.payload);
    // });

    // builder.addCase(FetchAlbum.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.errorMsg = action.error;
    // });
builder.addCase(FetchAlbum.fulfilled, (state, action) => {
  state.isLoading = false;

  // ✅ Get userId from the ACTION ARGUMENT, not the payload
  const fetchedUserId = action.meta.arg;

  // Always replace — even if payload is empty []
  state.data = state.data.filter((album) => album.userId !== fetchedUserId);

  state.data.push(...action.payload);
});
    // ---------------- REMOVE USER (Xóa User -> Xóa Album) ----------------
    builder.addCase(RemoveUser.fulfilled, (state, action) => {
      state.data = state.data.filter((album) => {
        return album.userId !== action.payload.id;
      });
    });
  },
});

export const albumReducer = albumSlice.reducer;
