/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import axios from 'axios';
import { APP_BASE_API } from '@/config'
import { t } from '@/lang'
import useToastNotify from '@/hooks/useToastNotify'
const { notifyErr } = useToastNotify()
export interface FileBlobResult {
  blob: Blob;
  fileName: string;
}


let cancelTokens = [] as any

/**
 * 通用返回值类型
 */
export interface Result<T = any> {
  resultCode: number;
  resultDesc: string;
  data: T;
  page: {
    pageNo: number;
    pageSize: number;
    orderBy: string;
    order: 'ASC' | 'DESC';
    count: number;
    totalPage: number;
  };
}
const serve: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_USER_NODE_ENV === 'development' ? '' : APP_BASE_API,
  withCredentials: true,
  timeout: 1000 * 60,
});
// request interceptor
serve.interceptors.request.use((config) => {
  // Create a new cancel token
  if (config.url !== '/api/contract/abi' && config.url !== '/api/user/logout') {
    const source = axios.CancelToken.source();
    config.cancelToken = source.token;
    cancelTokens.push(source);
  }
  // Loading
  return config;
});

// response interceptor
serve.interceptors.response.use(
  (res: AxiosResponse<Result>) => {
    return new Promise((resolve, reject) => {
      const { resultCode } = res.data;
      if (resultCode === 100) {
        return resolve(res);
        // catch the error code
      } else if ([402].includes(resultCode)) {
        localStorage.clear();
        notifyErr(t('common.loginExpired'), true)
        setTimeout(() => {
          window.location.replace('/')
        }, 3000)
        return reject(res.data);
      }
      notifyErr(res.data.resultDesc, true)
      return reject(res.data);
    });
  },
  (error) => {
    // response error
    const { code, message, response } = error || {};
    console.error(error);
    const err: string = error?.toString?.() ?? '';
    let resultDesc = '';
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        resultDesc = 'Request timeout, please try again later';
      }
      if (err?.includes('Network Error')) {
        resultDesc = 'Network Error, please try again later';
      } else if (response && response.data && response.data.resultDesc) {
        resultDesc = response.data.resultDesc;
      }
    } catch (e) {
      throw new Error(e as unknown as string);
    }
    error.resultDesc = resultDesc;
    return Promise.reject(error);
  },
);
/**
 * common request function
 * @param config axios config，type is AxiosRequestConfig
 * @returns
 */
const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    const url = config.url;
    // if (mock) {
    //   mockRequest(serve, url as string, config.method as string, config?.data)
    // }
    serve
      .request<any, AxiosResponse<Result>>({ ...config, url })
      .then((res: AxiosResponse<Result>) => {
        resolve(res.data as never as Promise<T>);
      })
      .catch((e: Error | AxiosError) => {
        reject(e);
      });
  });
};

export const cancelAllRequests = () => {
  cancelTokens.forEach((source: any) => {
    source.cancel('Request canceled');
  });
  cancelTokens = [];

};

export default request;
