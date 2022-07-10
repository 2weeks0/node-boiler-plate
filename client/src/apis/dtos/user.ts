export interface RequestRegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface ResponseRegisterDto {
  success: boolean;
}

export interface RequestLoginDto {
  email: string;
  password: string;
}

export interface ResponseLoginDto {
  success: boolean;
  userId: string;
}

export interface ResponseLogoutDto {
  success: boolean;
}

export interface ResponseAuthDto {
  success: boolean;
  userInfo: UserInfo;
}

export interface UserInfo {
  name: string;
  email: string;
  password: string;
}