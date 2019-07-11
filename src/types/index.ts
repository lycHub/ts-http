export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DElETE'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'
  | 'put'
  | 'PUT'
  | 'head'
  | 'HEAD'
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
