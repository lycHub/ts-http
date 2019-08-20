import { isPlainObject } from "./utils";

export function transformRequest(data: any): any {
  return isPlainObject(data) ? JSON.stringify(data) : data;
}


export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    }catch(err) {
      // do something...
    }
  }
  return data;
}