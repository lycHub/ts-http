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
  headers?: any
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  Headers: any
  config: AxiosRequestConfig
  request: any
}


export interface AxiosPromise extends Promise<AxiosResponse> {

}