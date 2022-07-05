import axios from "axios";
import { baseURL } from "./index";

export interface ILoginBody {
  email: string;
  password: string;
}

export async function login(body: ILoginBody) {
  try {
    const response = await axios.post(baseURL + "/login", body);
    return response.data;
  } catch (e) {
    return e;
  }
}

export interface IRegisterBody {
  email: string;
  password: string;
  name: string;
}

export async function register(body: IRegisterBody) {
  try {
    const response = await axios.post(baseURL + "/register", body);
    return response.data;
  } catch (e) {
    return e;
  }
}

export async function logout() {
  try {
    const response = await axios.get(baseURL + "/logout");
    return response.data;
  } catch (e) {
    return e;
  }
}

export async function auth() {
  try {
    const response = await axios.get(baseURL + "/auth");
    return response.data;
  } catch (e) {
    return e;
  }
}