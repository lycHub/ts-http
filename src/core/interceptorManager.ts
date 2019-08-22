import { ResovedFn, RejectedFn } from "../types";


interface Interceptor<T> {
  resolved: ResovedFn<T>
  rejected?: RejectedFn
}
export default class InterceptorManager<T> {
  private interceptors: (Interceptor<T> | null)[];
  constructor() {
    this.interceptors = [];
  }

  use(resolved: ResovedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({ resolved, rejected });
    return this.interceptors.length - 1;
  }

  eject(id: number) {
    // 如果删除，那么length就会乱，id也乱了
    // this.interceptors.splice(id, 1);
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(item => {
      if (item) {
        fn(item);
      }
    });
  }
}