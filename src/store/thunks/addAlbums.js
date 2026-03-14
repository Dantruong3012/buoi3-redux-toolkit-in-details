import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { randomCustomAlbumName } from "../../dummy-data/data";

const AddAlbum = createAsyncThunk("api/addalbum", async (user) => {
  const response = await axios.post("http://localhost:3001/albums", {
    name: randomCustomAlbumName(),
    userId: user.id, 
  });
  return response.data;
});

export default AddAlbum;
