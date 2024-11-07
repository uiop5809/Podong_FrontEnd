import axios from "axios";

const tokenString = sessionStorage.getItem("token");
const token = tokenString ? JSON.parse(tokenString) : null;

const Axios = axios.create({

  // eslint-disable-next-line no-undef
  baseURL: http.localhost.8080,
  // baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,

  headers: {
    Authorization: `Bearer ${token?.loginState?.data?.accessToken}`,
    "Content-Type": "application/json",
  },
});

export default Axios;
