import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, ILoginBody, register, IRegisterBody, logout } from "../../apis/user";

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

    builder.addCase(logoutThunk.fulfilled, (state, action) => {
      if (action.payload?.success) {
        state.userId = "";
      }
    });
  },
});

export const loginThunk = createAsyncThunk(
  "user/login",
  async (body: ILoginBody) => await login(body)
);

export const registerThunk = createAsyncThunk(
  "user/register",
  async (body: IRegisterBody) => await register(body)
);

export const logoutThunk = createAsyncThunk(
  "user/logout",
  async () => await logout()
);

export const selectUserId = (state: any) => state.user.userId;
export default userSlice.reducer;
