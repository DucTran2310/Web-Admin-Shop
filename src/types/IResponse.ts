export interface APIResponse<T = any> {
  error: boolean;
  message: string;
  data: T | null;
}