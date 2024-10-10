import axiosClient from "@/apis/axiosClient"
import { APIResponse } from "@/types/IResponse"

const handleAPI = async <T = any>(
  url: string,
  data?: any,
  method?: 'post' | 'put' | 'get' | 'delete'
): Promise<APIResponse<T>> => {
  return await axiosClient(url, {
    method: method ?? 'get',
    data
  })
}

export default handleAPI