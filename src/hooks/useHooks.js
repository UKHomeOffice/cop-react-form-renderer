export const ALLOWED_HOOKS = [
  'onFormComplete',
  'onFormLoad',
  'onGetComponent',
  'onPageChange',
  'onRequest',
  'onSubmit'
];

const DEFAULT_HOOKS = {
  onFormComplete: () => {},
  onFormLoad: () => {},
  onGetComponent: (config, wrap) => null,
  onPageChange: (pageId) => pageId,
  onRequest: (req) => req,
  onSubmit: (type, payload, onSuccess, onError) => {
    if (typeof onSuccess === 'function') onSuccess();
  }
};

const hooks = {
  onFormComplete: DEFAULT_HOOKS.onFormComplete,
  onFormLoad: DEFAULT_HOOKS.onFormLoad,
  onGetComponent: DEFAULT_HOOKS.onGetComponent,
  onPageChange: DEFAULT_HOOKS.onPageChange,
  onRequest: DEFAULT_HOOKS.onRequest,
  onSubmit: DEFAULT_HOOKS.onSubmit
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
