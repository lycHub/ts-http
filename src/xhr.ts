import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { parseHeaders } from './helpers/header';
import { transformResponse } from './helpers/data';
import { createError } from './helpers/error';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType = 'json', timeout = 0 } = config;
    const request = new XMLHttpRequest();
    request.responseType = responseType;
    request.timeout = timeout;
    request.open(method.toUpperCase(), url, true);
  
    Object.keys(headers).forEach(name => {
      if (!data && name.toLowerCase() === 'content-type') {
        delete headers[name];
      }else {
        request.setRequestHeader(name, headers[name]);
      }
    });

    request.send(data);

    request.onreadystatechange = function() {
      // 请求错误或超时，状态码都是0
      if (request.status === 0) {
        return ;
      }
      if (request.readyState === 4) {
        const responseHeaders = parseHeaders(request.getAllResponseHeaders());
        const responseData = responseType === 'text' ? request.responseText : request.response;
        if (handleResponse(request.response)) {
          resolve({
            data: transformResponse(responseData),
            status: request.status,
            statusText: request.statusText,
            Headers: responseHeaders,
            config,
            request
          });
        }else {
          reject(createError(
            'Request fail with status code' + request.response.status,
            config,
            null,
            request,
            request.response
          ));
        }
      }
    }

    request.onerror = function() {
      reject(createError('Network error', config, null, request));
    }

    request.ontimeout = function() {
      reject(createError('Time out of '+ timeout +' ms exceeded', config, 'ECONNABORTED', request));
    }
  });
  
}


function handleResponse(response: AxiosResponse) {
  return response.status >= 200 && response.status < 300;
}
