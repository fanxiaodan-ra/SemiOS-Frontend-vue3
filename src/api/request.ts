import axios from 'axios'
import { useRouter } from 'vue-router'
import { APP_BASE_API } from '@/config'
const router = useRouter();
// An array for storing cancellation tokens
let cancelTokens = [] as any

const createService = () => {
  const service = axios.create({
    withCredentials: true,
    baseURL:
      import.meta.env.VITE_USER_NODE_ENV === 'development' ? '' : APP_BASE_API,
    timeout: 60000
  });

  service.interceptors.request.use(
    (config) => {
      // Create a new cancel token
      const source = axios.CancelToken.source();
      config.cancelToken = source.token;
      cancelTokens.push(source);

      // Loading
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    (response) => {
      if (response.data.resultCode === 402) {

        router.push('/');
        return false;
      }
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return service;
};

// Function to cancel the current request
let service = createService();

const cancelAllRequests = () => {
  console.log(cancelTokens, 'cancelTokens')
  cancelTokens.forEach((source: any) => {
    source.cancel('Request canceled');
  });
  cancelTokens = [];

  console.log(cancelTokens, 'cancelTokens NUll')
};

export { service, cancelAllRequests };
