import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from "./types";
import Axios from "./core/Axios";
import { extend } from "./helpers/utils";
import defaults from "./default";
import mergeConfig from "./core/mergeConfig";
import CancelToken from "./cancel/cancelToken";
import Cancel, { isCancel } from "./cancel/cancel";

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config);
  const instance = Axios.prototype.request.bind(context);
  extend(instance, context);
  return instance as AxiosStatic;
}
const axios = createInstance(defaults);
axios.create = function (config) {
  return createInstance(mergeConfig(defaults, config));
}

axios.cancelToken = CancelToken;
axios.cancel = Cancel;
axios.isCancel = isCancel;

axios.all = function(promises) {
  return Promise.all(promises);
}

axios.spread = function(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  }
}

axios.Axios = Axios;
export default axios;