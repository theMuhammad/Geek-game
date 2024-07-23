import axios from "axios";

const api = axios.create({
  baseURL: `https://headphones-server.onrender.com`,
});

export default api;
