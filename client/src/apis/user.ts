import axios from "axios";
import { baseURL } from "./index";

export interface LoginBody {
    email: string;
    password: string;
  }

export async function login(body: LoginBody) {
  try {
    const response = await axios.post(baseURL + "/login", body);
    return response.data;
  } catch (e) {
    return e;
  }
}
