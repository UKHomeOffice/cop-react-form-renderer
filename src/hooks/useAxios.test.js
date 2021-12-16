// Global imports
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Local imports
import useAxios from './useAxios';
import { addHook } from './useHooks';

describe('hooks', () => {

  describe('useAxios', () => {
    const mockAxios = new MockAdapter(axios);

    it('can perform a API call', async () => {
      mockAxios.onGet('/api/data').reply(200, [{ id: 'test' }]);
      const axiosInstance = renderHook(() => useAxios('token'));

      const result = await axiosInstance.result.current.get('/api/data');
      expect(result.status).toBe(200);
      expect(result.data.length).toBe(1);
    });

    it('can log error to server if api call fails', async () => {
      mockAxios.onGet('/api/data').reply(500, {});
      const axiosInstance = renderHook(() => useAxios('token'));

      let error = undefined;
      try {
        await axiosInstance.result.current.get('/api/data');
      } catch (e) {
        error = e;
      }
      expect(error).toBeDefined();
      expect(error.message).toEqual('Request failed with status code 500');
    });

    it('calls the onRequest hook when specified', async () => {
      let onRequestHookCalled = false;
      addHook('onRequest', (req) => {
        onRequestHookCalled = true;
        return req;
      });
      mockAxios.onGet('/api/data').reply(200, [{ id: 'test' }]);
      const axiosInstance = renderHook(() => useAxios('token'));

      expect(onRequestHookCalled).toBeFalsy();
      await axiosInstance.result.current.get('/api/data');
      expect(onRequestHookCalled).toBeTruthy();
    });

  });

});
