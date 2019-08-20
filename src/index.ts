import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import {buildUrl} from "./helpers/url";

export default function axios(config: AxiosRequestConfig) {
  processConfig(config);
  xhr(config);
}


function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildUrl(url, params);
}
