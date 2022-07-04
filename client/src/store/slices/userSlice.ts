import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, LoginBody } from "../../apis/user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      if (action.payload?.success) {
        state.userId = action.payload.userId;
      }
    });
  },
});

export const loginThunk = createAsyncThunk(
  "user/login",
  async (body: LoginBody) => await login(body)
);

export const selectUserId = (state: any) => state.user.userId;
export default userSlice.reducer;