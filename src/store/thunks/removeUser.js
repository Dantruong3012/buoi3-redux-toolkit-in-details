import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const RemoveUser = createAsyncThunk("api/removeuser", async (user) => {
    const response = await axios.delete(`http://localhost:3001/users/${user.id}`);
    return response.data;
})

export {RemoveUser};