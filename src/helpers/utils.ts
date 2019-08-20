const toString = Object.prototype.toString;

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]';
}

/* export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object';
} */

// 是否为普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]';
}

export function isArray(val: any): val is Array<any> {
  if (Array.isArray) {
    return Array.isArray(val);
  }else {
    return toString.call(val) === '[object Array]';
  }
}
