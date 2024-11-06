import axios from 'axios';

const tokenString = sessionStorage.getItem('token');
const token = tokenString ? JSON.parse(tokenString) : null;

const Axios = axios.create({
  // eslint-disable-next-line no-undef
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: 'http://localhost:8080/api',

  headers: {
    Authorization: `Bearer ${token?.loginState?.data?.accessToken}`,
    'Content-Type': 'application/json',
  },
});

export default Axios;
