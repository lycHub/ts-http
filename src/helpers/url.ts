import {isArray, isDate, isObject} from "./utils";

export function buildUrl(url: string, params?: any): string {
  if (params) {
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
      values.forEach(item => {
        if (isDate(item)) {
          item = item.toISOString()
        }else if (isObject(item)) {
          item = JSON.stringify(item);
        }
        parts.push(`${encode(key)}=${encode(item)}`);
      });
    });

    const serializedParams = parts.join('&');
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
