import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// trong ham fetchuser api/getuser co the dat ten tuy y
const FetchUser = createAsyncThunk("api/getuser", async () => {
  const response = await axios.get("http://localhost:3001/users");

  // dev only for loading function
  await pause(1000);

  return response.data;
});

// dev only  test loading loading function
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
export { FetchUser };
