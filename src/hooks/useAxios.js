// Global imports
import axios from 'axios';
import { useEffect, useState } from 'react';

// Local imports
import useHooks from './useHooks';

const useAxios = () => {
  const { hooks } = useHooks();
  const [axiosInstance, setAxiosInstance] = useState({});

  useEffect(() => {
    const instance = axios.create({ baseURL: '/' });
    instance.interceptors.request.use(hooks.onRequest);
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        return Promise.reject(error);
      }
    );

    setAxiosInstance({ instance });
    return () => {
      setAxiosInstance({});
    };
  }, [hooks]);

  return axiosInstance.instance;
};

export default useAxios;
