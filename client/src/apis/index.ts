import axios from "axios";

const baseURL: string = "http://localhost:5000";

export const axiosInstance = axios.create({
  baseURL,
});