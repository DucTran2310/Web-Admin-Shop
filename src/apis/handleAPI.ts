import { APIResponse } from "@/types/IResponse";
import axiosClient from "./axiosClient";

export const handleAPI = async <T = any>(
  url: string,
  data?: any,
  method: "post" | "put" | "get" | "delete" = "get"
): Promise<APIResponse<T>> => {
  try {
    console.log("VVVDATA: ", data);

    const response = await axiosClient(url, {
      method,
      data,
    });

    console.log('VVVresponse: ', response)

    // Truy cập `response.data` từ `AxiosResponse`
    const apiResponse: APIResponse<T> = {
      error: false,
      message: response.data?.message || "Success",
      data: response.data?.data || null,
    };

    return apiResponse;
  } catch (error: any) {
    // Trả về lỗi đã được định dạng
    const errorResponse: APIResponse<T> = {
      error: true,
      message: error?.response?.data?.message || error.message || "An error occurred",
      data: null,
    };
    return Promise.reject(errorResponse);
  }
};
