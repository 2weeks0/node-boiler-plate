import { axiosInstance } from "./index";
import {
  RequestRegisterDto,
  ResponseRegisterDto,
  RequestLoginDto,
  ResponseLoginDto,
  ResponseLogoutDto,
  ResponseAuthDto,
} from "./dtos/user";

interface UserApi {
  register: (requestRegisterDto: RequestRegisterDto) => Promise<ResponseRegisterDto>;
  login: (requestLoginDto: RequestLoginDto) => Promise<ResponseLoginDto>;
  logout: () => Promise<ResponseLogoutDto>;
  auth: () => Promise<ResponseAuthDto>;
}

export const userApi: UserApi = {
  register: async (requestRegisterDto: RequestRegisterDto): Promise<ResponseRegisterDto> => {
    return (
      await axiosInstance.request({
        method: "POST",
        url: "/register",
        data: requestRegisterDto,
      })
    ).data;
  },
  login: async (requestLoginDto: RequestLoginDto): Promise<ResponseLoginDto> => {
    return (
      await axiosInstance.request({
        method: "POST",
        url: "/login",
        data: requestLoginDto,
      })
    ).data;
  },
  logout: async (): Promise<ResponseLogoutDto> => {
    return (
      await axiosInstance.request({
        method: "GET",
        url: "/logout",
      })
    ).data;
  },
  auth: async (): Promise<ResponseAuthDto> => {
    return (
      await axiosInstance.request({
        method: "GET",
        url: "/auth",
      })
    ).data;
  },
};
