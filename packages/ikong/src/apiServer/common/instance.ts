import axios from "axios";
const instance = axios.create({ baseURL: "/api" });
instance.interceptors.response.use(function (res) {
  return res.data;
});
export default instance;
