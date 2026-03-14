import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const FetchAlbum = createAsyncThunk("api/getalbum", async (userId) => {
  const response = await axios.get("http://localhost:3001/albums", {
    params: {
      userId: userId,
    },
  });

  return response.data;
});

export { FetchAlbum };
