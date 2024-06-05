import { notification } from 'antd';
import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig } from 'axios';
import history from './history';

interface ResData<T = any> {
  success: boolean;
  message?: string;
  code?: number;
  data?: T;
}

let lastMessage: string;
let lastTime: number;
/*
 ** 需要跳转登录的错误码
 **/
const NO_AUTH_CODES: number[] = [];

/**
 * 状态码的错误信息
 */
const STATUS_MESSAGES: Record<string, string> = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  500: '系统繁忙，请稍后再试。',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持',
};

/**
 * 错误码的错误信息
 */
const CODE_MESSAGES: Record<string, string> = {
  ERR_NETWORK: '网络错误',
  ECONNABORTED: '请求超时',
};

const openNotification = (message: string) => {
  notification.destroy();
  notification.error({
    message: '错误提示：',
    description: message || '系统繁忙，请稍后再试',
  });
};

const redirectLogin = () => {
  history.push('/login');
};

// 记录和显示错误
function logError(msg: string) {
  // 相同的消息在一秒钟之内不重复提示
  if (!(lastMessage === msg && lastTime + 1000 > Date.now())) {
    lastMessage = msg;
    lastTime = Date.now();
    openNotification(msg);
  }
}

function setAxiosRequestHeader(config: AxiosRequestConfig, key: string, value: string) {
  if (!config.headers) {
    config.headers = {};
  }
  if (typeof config.headers.set === 'function') {
    config.headers.set(key, value);
  } else if (!(config.headers instanceof AxiosHeaders)) {
    config.headers[key] = value;
  }
}

export default class Service {
  public service: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.service = axios.create({
      timeout: 50000,
      // withCredentials: true,
      ...config,
    });

    this.service.interceptors.request.use(
      (config) => {
        setAxiosRequestHeader(config, 'Authorization', '');
        return config;
      },
      (error) => {
        // 发送失败
        console.error(error);
        Promise.reject(error);
      },
    );

    // 响应拦截器
    this.service.interceptors.response.use(
      (response) => {
        const dataAxios = response.data as ResData;
        if ((response.headers['content-type'] as string)?.includes('json')) {
          // 这个状态码是和后端约定的
          const { success, code, message: msg } = dataAxios;
          // 兼容非标准响应体
          if (typeof success === 'undefined' && !code && !msg) {
            return response;
          }
          // 本身就在登录页面就不要跳转登录页了
          if (code && NO_AUTH_CODES.includes(code)) {
            redirectLogin();
          }
          if (success) {
            return dataAxios as any;
          } else {
            if (msg) {
              logError(msg);
            }
            return Promise.reject(dataAxios);
          }
        } else {
          return response;
        }
      },
      (error) => {
        if (!axios.isCancel(error)) {
          if (error?.response) {
            error.msg = error.response.data?.msg || STATUS_MESSAGES[error.response.status];
            if (error.response.status === 401) {
              redirectLogin();
            }
          } else if (error?.code) {
            error.msg = CODE_MESSAGES[error.code];
          }
          logError(error.msg || error.message);
          return Promise.reject(error);
        } else {
          return Promise.reject(error);
        }
      },
    );
  }

  public request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
    const res = await this.service.request<T>(config);
    return res.data;
  };

  public get = async <T = any>(url: string, config?: AxiosRequestConfig) => {
    const res = await this.service.get<T>(url, config);
    return res.data;
  };

  public delete = async <T = any>(url: string, config?: AxiosRequestConfig) => {
    const res = await this.service.delete<T>(url, config);
    return res.data;
  };

  public options = async <T = any>(url: string, config?: AxiosRequestConfig) => {
    const res = await this.service.options<T>(url, config);
    return res.data;
  };

  public head = async <T = any>(url: string, config?: AxiosRequestConfig) => {
    const res = await this.service.head<T>(url, config);
    return res.data;
  };

  public post = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const res = await this.service.post<T>(url, data, config);
    return res.data;
  };

  public put = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const res = await this.service.put<T>(url, data, config);
    return res.data;
  };

  public patch = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const res = await this.service.patch<T>(url, data, config);
    return res.data;
  };
}
