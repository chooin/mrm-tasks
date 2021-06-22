import axios, {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(async (config: AxiosRequestConfig) => {

});

instance.interceptors.response.use(
  async (response: AxiosResponse) => {

  },
  (error: AxiosError) => {

  }
);

export default instance;
