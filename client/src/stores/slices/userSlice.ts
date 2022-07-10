import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestRegisterDto, RequestLoginDto } from "../../apis/dtos/user";
import { userApi } from "../../apis/user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    userInfo: null,
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
        state.userInfo = null;
      }
    });

    builder.addCase(authThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload?.success) {
        state.userInfo = action.payload.userInfo;
      } else {
        state.userInfo = null;
        state.userId = "";
      }
    });
  },
});

export const loginThunk = createAsyncThunk(
  "user/login",
  async (requestLoginDto: RequestLoginDto) => await userApi.login(requestLoginDto)
);

export const registerThunk = createAsyncThunk(
  "user/register",
  async (requestRegisterDto: RequestRegisterDto) => await userApi.register(requestRegisterDto)
);

export const logoutThunk = createAsyncThunk("user/logout", async () => await userApi.logout());

export const authThunk = createAsyncThunk("user/auth", async () => await userApi.auth());

export const selectUserId = (state: any) => state.user.userId;
export const selectUserInfo = (state: any) => state.user.userInfo;
export default userSlice.reducer;
