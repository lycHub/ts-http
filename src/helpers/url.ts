import {isArray, isDate, isPlainObject, isURLSearchParams} from "./utils";

interface UrlOrigin {
  protocol: string
  host: string
}

export function buildUrl(url: string, params?: any, paramsSerializer?: (params?: any) => string): string {
  if (params) {
    let serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    }else if (isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      const parts: string[] = [];
    Object.keys(params).forEach(key => {
      const val = params[key];
      if (val === null || typeof val === 'undefined') {
        // foreach里的return只会结束这次循环，开始下个循环
        return;
      }
      let values = [];
      if (isArray(val)) {
        values = val;
        key += '[]';
      }else {
        values = [val];
      }
      values.forEach((item: any) => {
        if (isDate(item)) {
          item = item.toISOString()
        }else if (isPlainObject(item)) {
          item = JSON.stringify(item);
        }
        parts.push(`${encode(key)}=${encode(item)}`);
      });
    });
    serializedParams = parts.join('&');
    }
    
    if (serializedParams) {
      const markIndex = url.indexOf('#');
      if (markIndex !== -1) {
        url = url.slice(0, markIndex);
      }
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
  }else {
    return url;
  }
}


function encode(val: string): string {
  return encodeURIComponent(val)

  // 下面特殊字符不希望被编码，所以转回来
    .replace(/%40/g, '@')
    .replace(/%3a/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2c/ig, ',')
    .replace(/%20/g, '+')     // 空格 => +
    .replace(/%5b/ig, '[')
    .replace(/%5d/ig, ']')
}


const urlParsingNode = document.createElement('a');
const currentOrigin = resolveURL(location.href);



// 是否同域请求
export function isUrlSameOrigin(requestUrl: string): boolean {
  const { protocol, host } = resolveURL(requestUrl);
  return (protocol === currentOrigin.protocol && host === currentOrigin.host);
}


function resolveURL(url: string): UrlOrigin {
  urlParsingNode.setAttribute('href', url);
  // protocal是url的协议：http | https
  const { protocol, host } = urlParsingNode;
  return { protocol, host };
}


export function isAbsoluteUrl(url: string): boolean {
  return /(^\w[\w\d\+\-\.]*:)?\/\//i.test(url);
}

export function combineURL(baseUrl: string, relativeUrl?: string): string {
  return relativeUrl ? baseUrl.replace(/\/+$/, '') + '/' + relativeUrl.replace(/^\/+/, '') : baseUrl;
}