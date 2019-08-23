import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../types";
import { buildUrl, isAbsoluteUrl, combineURL } from "../helpers/url";
import { flattenHeaders } from "../helpers/header";
import xhr from "./xhr";
import transform from "./transform";

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config);
  processConfig(config);
  return xhr(config).then(res => transformResponseData(res));
}


function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
  config.data = transform(config.data, config.headers, config.transformRequest);
  config.headers = flattenHeaders(config.headers, config.method!);
}

function transformUrl(config: AxiosRequestConfig): string {
  let url = config.url;
  const { params, paramsSerializer, baseUrl } = config;
  if (baseUrl && !isAbsoluteUrl(url!)) {
    url = combineURL(baseUrl, url);
  }
  return buildUrl(url!, params, paramsSerializer);
}


function transformResponseData(res: AxiosResponse): any {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return res;
}





function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}