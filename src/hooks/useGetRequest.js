// Global imports
import axios from 'axios';
import { useEffect, useState } from 'react';

// Local imports
import useAxios from './useAxios';

const cache = {};
const cacheErrors = {};

export const STATUS_IDLE = 'idle';
export const STATUS_FETCHING = 'fetching';
export const STATUS_FETCHED = 'fetched';
export const STATUS_ERROR = 'error';

const useGetRequest = (url) => {
  const axiosInstance = useAxios();
  const cancelToken = axios.CancelToken.source();
  const cancelRequests = () => {
    if (cancelToken) cancelToken.cancel();
  };
  const [status, setStatus] = useState(STATUS_IDLE);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!url || !axiosInstance) return;

    const fetchData = async () => {
      try {
        setStatus(STATUS_FETCHING);
        let fetchedData;
        if (cache[url]) {
          fetchedData = cache[url];
        } else if (cacheErrors[url]) {
          fetchedData = null;
        } else {
          const response = await axiosInstance.get(url, {
            cancelToken: cancelToken.token
          });
          fetchedData = response.data;
          cache[url] = fetchedData;
        }
        setData(fetchedData);
        setStatus(STATUS_FETCHED);
      } catch (error) {
        cacheErrors[url] = error;
        setData(null);
        setStatus(STATUS_ERROR);
      }
    };
    fetchData();
  }, [axiosInstance, url, cancelToken.token])

  return { status, data, cancelRequests };
};

export default useGetRequest;
