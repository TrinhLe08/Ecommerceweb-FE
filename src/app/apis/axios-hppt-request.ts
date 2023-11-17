import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_SERVER,
});

httpRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    config.headers.authorization = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpRequest;
