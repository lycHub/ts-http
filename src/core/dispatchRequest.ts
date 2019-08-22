import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../types";
import { buildUrl } from "../helpers/url";
import { transformRequest } from "../helpers/data";
import { processHeaders } from "../helpers/header";
import xhr from "./xhr";

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then(res => transformResponseData(res));
}


function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildUrl(url!, params);
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}

function transformResponseData(res: AxiosResponse): any {
  res.data = transformRequest(res.data);
  return res;
}


function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}
