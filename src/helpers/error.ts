import { AxiosRequestConfig, AxiosResponse } from "../types";

export class AxiosError extends Error {
  config: AxiosRequestConfig;
  isAxiosError: boolean;
  code?: string | null;
  request?: any;
  response?: AxiosResponse;
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message);
    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    this.isAxiosError = true;

    // ts继承内置对象时，无法调用原型上的方法，需要加上下面这句话
    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  return new AxiosError(message, config, code, request, response);
}