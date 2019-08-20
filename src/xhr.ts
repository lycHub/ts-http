import { AxiosRequestConfig, AxiosPromise } from './types/index'
import { parseHeaders } from './helpers/header';
import { transformResponse } from './helpers/data';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config;
    const request = new XMLHttpRequest();
    request.responseType = responseType || 'json';
    request.open(method.toUpperCase(), url, true);
  
    Object.keys(headers).forEach(name => {
      if (!data && name.toLowerCase() === 'content-type') {
        delete headers[name];
      }else {
        request.setRequestHeader(name, headers[name]);
      }
    });

    request.send(data);

    request.onreadystatechange = function handleLoad() {
      if (request.readyState === 4) {
        const responseHeaders = parseHeaders(request.getAllResponseHeaders());
        const responseData = responseType === 'text' ? request.responseText : request.response;
        resolve({
          data: transformResponse(responseData),
          status: request.status,
          statusText: request.statusText,
          Headers: responseHeaders,
          config,
          request
        });
      }
    }
  });
  
}
