import axios from "axios";
import { clearSession, getSession } from "../auth";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
});

instance.interceptors.request.use(
  function (config) {
    const { token = "" } = getSession();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    if (error.response.data?.message) {
      alert(error.response.data.message);
    } else {
      alert(error);
    }

    if (error.response.status === 401) {
      clearSession();
      document.location = "/";
    }
  }
);

export default instance;
