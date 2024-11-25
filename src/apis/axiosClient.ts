import { localDataNames } from "@/constants/appInfo";
import axios from "axios";
import queryString from "query-string";

const baseURL = import.meta.env.VITE_BASE_URL_SERVER;

const getAccessToken = () => {
  const res = localStorage.getItem(localDataNames.authData);

  return res ? JSON.parse(res).token : "";
};

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  const accessToken = getAccessToken();

  config.headers = {
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
    Accept: "application/json",
    ...config.headers,
  };

  return { ...config, data: config.data ?? null };
});

axiosClient.interceptors.response.use(
  (response) => {
    // Trả về toàn bộ `AxiosResponse` thay vì chỉ `response.data`
    return response;
  },
  (error) => {
    // Trả về toàn bộ lỗi từ `AxiosResponse`
    return Promise.reject(error);
  }
);


export default axiosClient;
