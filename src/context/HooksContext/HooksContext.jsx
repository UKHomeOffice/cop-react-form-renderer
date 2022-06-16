// Global imports
import React, { createContext, useState } from 'react';

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

export const ALLOWED_HOOKS = Object.keys(DEFAULT_HOOKS);

export const HooksContext = createContext();

const HooksContextProvider = ({ overrides, children }) => {
  const [hooks, setHooks] = useState({
    onFormComplete: overrides?.onFormComplete || DEFAULT_HOOKS.onFormComplete,
    onFormLoad: overrides?.onFormLoad ||  DEFAULT_HOOKS.onFormLoad,
    onGetComponent: overrides?.onGetComponent ||  DEFAULT_HOOKS.onGetComponent,
    onPageChange: overrides?.onPageChange ||  DEFAULT_HOOKS.onPageChange,
    onRequest: overrides?.onRequest ||  DEFAULT_HOOKS.onRequest,
    onSubmit: overrides?.onSubmit ||  DEFAULT_HOOKS.onSubmit
  });

  const addHook = (name, hook) => {
    if (ALLOWED_HOOKS.includes(name)) {
      setHooks(prev => ({
        ...prev,
        [name]: hook || DEFAULT_HOOKS[name] // Don't allow it to be undefined.
      }));
    }
  };
  
  const removeHook = (name) => {
    if (ALLOWED_HOOKS.includes(name)) {
      setHooks(prev => ({
        ...prev,
        [name]: DEFAULT_HOOKS[name]
      }));
    }
  };

  return (
    <HooksContext.Provider value={{ hooks, addHook, removeHook }}>
      {children}
    </HooksContext.Provider>
  );
};

export default HooksContextProvider;
