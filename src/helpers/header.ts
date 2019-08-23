import { isPlainObject, deepMerge } from "./utils";
import { Method } from "../types";

export function processHeaders(headers: any, data: any): any {
  // 保证headers的key值命名统一
  normalizeHeaderName(headers, 'Content-Type');
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }
  }

  return headers;
}


export function parseHeaders(headers: string): Object {
  const result = Object.create(null);
  if (headers) {
    headers.split('\r\n').forEach(line => {
      let [key, val] = line.split(':');
      key = key.trim().toLowerCase();
      if (!key) return;
      if (val) {
        val = val.trim();
      }
      result[key] = val;
    })
  }
  return result;
}


function normalizeHeaderName (headers: any, normalizedName: string): void {
  if (headers) {
    Object.keys(headers).forEach(name => {
      /* 
        如果headers里的key不等于normalizedName但是全大写后等于normalizedName
        那么headers里的key是不规范的，需要删掉换成normalizedName
      */
     
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = headers[name];
        delete headers[name];
      }
    });
  }
}


export function flattenHeaders(headers: any, method: Method): any {
  if (headers) {
    const methodsToDelete = ['delete', 'get', 'post', 'head', 'options', 'put', 'patch', 'common'];
    headers = deepMerge(headers.common, headers[method]);
    methodsToDelete.forEach(method => {
      delete headers[method];
    })
  }
  return headers;
}
