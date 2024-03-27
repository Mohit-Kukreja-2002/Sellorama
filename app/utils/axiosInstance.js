import axios from 'axios';

// Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export default axiosInstance;