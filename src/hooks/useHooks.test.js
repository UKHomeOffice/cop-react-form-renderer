// Global imports
import { renderHook } from '@testing-library/react-hooks';

// Local imports
import useHooks, { resetHooks } from './useHooks';

describe('hooks', () => {

  describe('useHooks', () => {

    afterEach(async () => {
      resetHooks();
    });

    const checkResult = (result) => {
      expect(result).toBeDefined();
      expect(result.current).toBeDefined();
      return {
        ...result.current
      };
    };

    it('should have default hooks in place', async () => {
      const { result } = renderHook(() => useHooks());
      const { hooks, addHook } = checkResult(result);
      expect(hooks).toBeDefined();
      expect(typeof hooks.onRequest).toEqual('function');
      expect(typeof addHook).toEqual('function');
    });

    it('should allow onRequest to be overridden', async () => {
      const { result } = renderHook(() => useHooks());
      const { hooks, addHook } = checkResult(result);
      let ON_REQUEST_CALLS = 0;
      const NEW_ON_REQUEST = (req) => {
        ON_REQUEST_CALLS++;
        return req;
      }
      expect(hooks.onRequest).not.toEqual(NEW_ON_REQUEST);
      expect(ON_REQUEST_CALLS).toEqual(0);
      hooks.onRequest({});
      expect(ON_REQUEST_CALLS).toEqual(0);
      addHook('onRequest', NEW_ON_REQUEST);
      expect(hooks.onRequest).toEqual(NEW_ON_REQUEST);
      expect(ON_REQUEST_CALLS).toEqual(0);
      hooks.onRequest({});
      expect(ON_REQUEST_CALLS).toEqual(1);
    });

    it('should revert onRequest to the default pass-through handler when clearing it', async () => {
      const { result } = renderHook(() => useHooks());
      const { hooks, addHook } = checkResult(result);
      let ON_REQUEST_CALLS = 0;
      const NEW_ON_REQUEST = (req) => {
        ON_REQUEST_CALLS++;
        return req;
      }
      expect(ON_REQUEST_CALLS).toEqual(0);
      expect(hooks.onRequest).not.toEqual(NEW_ON_REQUEST);
      addHook('onRequest', NEW_ON_REQUEST);
      expect(hooks.onRequest).toEqual(NEW_ON_REQUEST);
      expect(ON_REQUEST_CALLS).toEqual(0);
      hooks.onRequest({});
      expect(ON_REQUEST_CALLS).toEqual(1);
      addHook('onRequest', undefined);
      hooks.onRequest({});
      expect(ON_REQUEST_CALLS).toEqual(1); // Didn't increase
      expect(typeof hooks.onRequest).toEqual('function');
      expect(hooks.onRequest).not.toEqual(NEW_ON_REQUEST);
    });

    it('should not allow an unknown hook to be added', async () => {
      const { result } = renderHook(() => useHooks());
      const { hooks, addHook } = checkResult(result);
      addHook('onUnknown', () => {});
      expect(hooks.onUnknown).not.toBeDefined();
    });

  });

});
