// Local imports
import { ALLOWED_HOOKS } from '../context/HooksContext/HooksContext';
import { PageAction } from '../models';
import { renderHookWithProvider } from '../setupTests';
import useHooks from './useHooks';

describe('hooks', () => {

  describe('useHooks', () => {

    const checkResult = (result) => {
      expect(result).toBeDefined();
      expect(result.current).toBeDefined();
      return {
        ...result.current
      };
    };

    it('should have default hooks in place', async () => {
      const { result } = renderHookWithProvider(() => useHooks());
      const { hooks, addHook } = checkResult(result);
      expect(hooks).toBeDefined();
      ALLOWED_HOOKS.forEach(hook => {
        expect(typeof hooks[hook]).toEqual('function');
      });
      expect(typeof addHook).toEqual('function');
    });

    ALLOWED_HOOKS.forEach(hook => {

      it(`should allow ${hook} to be overridden`, async () => {
        const { result } = renderHookWithProvider(() => useHooks());
        const { addHook } = checkResult(result);
        let FN_CALLS = 0;
        const NEW_FN = (req) => {
          FN_CALLS++;
          return req;
        }
        expect(result.current.hooks[hook]).not.toEqual(NEW_FN);
        expect(FN_CALLS).toEqual(0);
        result.current.hooks[hook]({});
        expect(FN_CALLS).toEqual(0);
        addHook(hook, NEW_FN);
        expect(result.current.hooks[hook]).toEqual(NEW_FN);
        expect(FN_CALLS).toEqual(0);
        result.current.hooks[hook]({});
        expect(FN_CALLS).toEqual(1);
      });

      it(`should revert ${hook} to the default pass-through handler when clearing it`, async () => {
        const { result } = renderHookWithProvider(() => useHooks());
        const { addHook, removeHook } = checkResult(result);
        let FN_CALLS = 0;
        const NEW_FN = (req) => {
          FN_CALLS++;
          return req;
        }
        expect(FN_CALLS).toEqual(0);
        expect(result.current.hooks[hook]).not.toEqual(NEW_FN);
        addHook(hook, NEW_FN);
        expect(result.current.hooks[hook]).toEqual(NEW_FN);
        expect(FN_CALLS).toEqual(0);
        result.current.hooks[hook]({});
        expect(FN_CALLS).toEqual(1);
        removeHook(hook);
        result.current.hooks[hook]({});
        expect(FN_CALLS).toEqual(1); // Didn't increase
        expect(typeof result.current.hooks[hook]).toEqual('function');
        expect(result.current.hooks[hook]).not.toEqual(NEW_FN);
      });

    });

    it('should call onSuccess function of onSubmit hook by default', async () => {
      const { result } = renderHookWithProvider(() => useHooks());
      const { hooks } = checkResult(result);
      let onSuccessCalled = false;
      let onErrorCalled = false;
      const ON_SUCCESS = () => {
        onSuccessCalled = true;
      };
      const ON_ERROR = () => {
        onErrorCalled = true;
      };
      hooks.onSubmit(PageAction.TYPES.SUBMIT, {}, ON_SUCCESS, ON_ERROR);
      expect(onSuccessCalled).toBeTruthy();
      expect(onErrorCalled).toBeFalsy();
    });

    it('should not allow an unknown hook to be added', async () => {
      const { result } = renderHookWithProvider(() => useHooks());
      const { hooks, addHook } = checkResult(result);
      addHook('onUnknown', () => {});
      expect(hooks.onUnknown).not.toBeDefined();
    });

    it('should do nothing if removing an unknown hook', async () => {
      const { result } = renderHookWithProvider(() => useHooks());
      const { hooks, removeHook } = checkResult(result);
      // Add to the hooks object, which is essentially meaningless in real use as there is nothing
      // in any of the logic to call it.
      const HOOK_NAME = 'onUnknown';
      hooks[HOOK_NAME] = () => {};
      expect(typeof hooks[HOOK_NAME]).toEqual('function');
      // Now try to remove it...
      removeHook(HOOK_NAME);
      // ... and it shouldn't do anything to it as it's not a known hook.
      expect(typeof hooks[HOOK_NAME]).toEqual('function');
    });

  });

});
