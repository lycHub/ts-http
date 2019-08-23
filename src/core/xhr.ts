import { AxiosRequestConfig, AxiosPromise, AxiosResponse, ValidStatus } from '../types/index'
import { parseHeaders } from '../helpers/header';
import { transformResponse } from '../helpers/data';
import { createError } from '../helpers/error';
import { isUrlSameOrigin } from '../helpers/url';
import cookie from '../helpers/cookie';
import { isFormData } from '../helpers/utils';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers, 
      responseType = 'json',
      timeout = 0,
      cancelToken,
      withCredentials = false,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config;
    const request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url!, true);

    configRequest();
    addEvents();
    processHeaders();
    processCancel();

    request.send(data);



    function configRequest(): void {
      request.responseType = responseType;
      request.timeout = timeout;
      request.withCredentials = withCredentials;
    }
    
    function addEvents() {
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    
      request.onerror = function() {
        reject(createError('Network error', config, null, request));
      }
    
      request.ontimeout = function() {
        reject(createError('Time out of '+ timeout +' ms exceeded', config, 'ECONNABORTED', request));
      }
    
    
      
      request.onreadystatechange = function() {
        // 请求错误或超时，状态码都是0
        if (request.status === 0) {
          return ;
        }
        if (request.readyState === 4) {
          const responseHeaders = parseHeaders(request.getAllResponseHeaders());
          const responseData = responseType === 'text' ? request.responseText : request.response;
          if (handleResponse(request.response, validateStatus)) {
            resolve({
              data: transformResponse(responseData),
              status: request.status,
              statusText: request.statusText,
              headers: responseHeaders,
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
    }
    
    
    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type'];
      }
    
      if ((withCredentials || isUrlSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName);
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue;
        }
      }
    
      Object.keys(headers).forEach(name => {
        if (!data && name.toLowerCase() === 'content-type') {
          delete headers[name];
        }else {
          request.setRequestHeader(name, headers[name]);
        }
      });

      if (auth) {
        // btoa： base64编码  atob解码
        // https://www.cnblogs.com/tindy/p/9299997.html
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }
    }
    
    
    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort();
          reject(reason);
        })
      }
    }
  });
  
}




function handleResponse(response: AxiosResponse, validateStatus: ValidStatus): boolean {
  const status = (response && response.status) || 200;
  return !validateStatus || validateStatus(status);
}
