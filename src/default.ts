import { AxiosRequestConfig } from "./types";
import { processHeaders } from "./helpers/header";
import { transformRequest, transformResponse } from "./helpers/data";

const methodsNoData = ['delete', 'get', 'head', 'options'];
const methodsWithData = ['post', 'put', 'patch'];

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data);
      return transformRequest(data);
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data);
    }
  ],
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  validateStatus(status: number): boolean {
    return status >= 200 && status < 300;
  }
}

methodsNoData.forEach(method => {
  defaults.headers[method] = {};
});

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-yrlencoded'
  };
});

export default defaults;