const ALLOWED_HOOKS = ['onRequest', 'onFormLoad', 'onPageChange', 'onSubmit'];

const DEFAULT_HOOKS = {
  onRequest: (req) => req,
  onFormLoad: () => {},
  onPageChange: (pageId) => pageId,
  onSubmit: (type, payload, onSuccess, onError) => {
    onSuccess();
  }
};

const hooks = {
  onRequest: (req) => req,
  onFormLoad: () => {},
  onPageChange: (pageId) => pageId,
  onSubmit: (type, payload, onSuccess, onError) => {
    onSuccess();
  }
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
