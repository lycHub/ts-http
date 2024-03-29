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
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest: AxiosTransformer | AxiosTransformer[]
  transformResponse: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onUploadProgress?: (e: ProgressEvent) => void
  onDownloadProgress?: (e: ProgressEvent) => void
  auth?: AxiosBasicCredentials
  validateStatus?: ValidStatus
  paramsSerializer?: (params: any) => string
  baseUrl?: string
  [key: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}


export interface AxiosPromise<T = any> extends Promise<AxiosResponse> {}


export interface AxiosError extends Error {
  config: AxiosRequestConfig
  isAxiosError: boolean
  code?: string | null
  request?: any
  response?: AxiosResponse 
}


export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  getUri(config: AxiosRequestConfig): string
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}


export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}


export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
  cancelToken: CancelTokenStatic
  cancel: CancelStatic
  isCancel(val: any): void

  all<T>(promises: (T | Promise<T>)[]): Promise<T[]>
  spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R
  Axios: AxiosClassStatic
}



export interface AxiosInterceptorManager<T> {
  use(resolved: ResovedFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}


export interface ResovedFn<T> {
  (val: T): T | Promise<T>
}
export interface RejectedFn {
  (error: any): any
}


export interface AxiosTransformer {
  (data: any, headers?: any): any
}


export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}


export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}


export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}


export interface CancelStatic {
  new(message?: string): Cancel
}

export interface AxiosBasicCredentials {
  username: string
  password: string
}

export interface ValidStatus {
  (status: number): boolean
}

export interface AxiosClassStatic extends AxiosInstance {
  new (config: AxiosRequestConfig): Axios
}