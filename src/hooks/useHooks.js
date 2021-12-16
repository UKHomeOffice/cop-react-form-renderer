const ALLOWED_HOOKS = ['onRequest'];

const DEFAULT_HOOKS = {
  onRequest: (req) => req
};

const hooks = {
  onRequest: (req) => req
};

export const addHook = (name, hook) => {
  if (ALLOWED_HOOKS.includes(name)) {
    hooks[name] = hook || DEFAULT_HOOKS[name]; // Don't allow it to be undefined.
  }
};

export const removeHook = (name) => {
  if (ALLOWED_HOOKS.includes(name)) {
    hooks[name] = DEFAULT_HOOKS[name];
  }
};

export const resetHooks = () => {
  Object.keys(hooks).forEach(removeHook);
};

const useHooks = () => {
  return { hooks, addHook, removeHook, resetHooks };
};

export default useHooks;
