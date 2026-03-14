import { createAsyncThunk } from "@reduxjs/toolkit";
import { randomName } from "../../dummy-data/data";
import axios from "axios";

const AddUser = createAsyncThunk("api/adduser", async () => {
  const response = await axios.post("http://localhost:3001/users", {
    name: randomName(),
  });
  return response.data;
});
export { AddUser };
