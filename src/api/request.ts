import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Request, Result } from "../model";

import axios from "axios";

let ajax = axios.create({
  baseURL: "https://www.fastmock.site/mock/0c128e036fe8e947720e1f4d4a06e390/api",
});

// request.interceptors.response.use((response) => response.data);

const request: Request.FC<any> = (config: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    try {
      ajax(config).then((res: AxiosResponse<Result>) => {
        const { data } = res;
        if (data.code === 200) {
          resolve(data);
        }
      });
    } catch (error) {
      reject({
        code: 500,
      });
    }
  });
};

export default request;
