import { AxiosRequestConfig } from "../types";
import { isPlainObject, deepMerge } from "../helpers/utils";


const strats = Object.create(null);

// 应用策略2的属性
const stratKeysFromVal2 = ['url', 'params', 'data'];

// 需要深度合并的属性
const stratKeysDeepMerge = ['headers', 'auth'];

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat;
});

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat;
});

export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
  // config2 = config2 || {};
  

  // const config = {} as any;
  const config = Object.create(null);   // 创建一个any类型的空对象

  for (const key in config2) {
    mergeField(key);
  }

  for (const key in config1) {
    if (!config2![key]) {
      mergeField(key);
    }
  }

  

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat;
    config[key] = strat(config1[key], config2![key]);
  }
  console.log('config :', config);
  return config;
}



function defaultStrat(val1: any, val2: any): any {
  return val2 || val1;
}

function fromVal2Strat(val1: any, val2: any): any {
  if (val2) {
    return val2;
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2);
  }else if (typeof val2 !== 'undefined') {
    return val2;
  }else if (isPlainObject(val1)) {
    return deepMerge(val1);
  }else if (typeof val1 !== 'undefined') {
    return val1;
  }
}