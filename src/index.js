// Local imports
import { addHook } from './hooks/useHooks';
import Utils from './utils';

const intercepts = {
  add: addHook
};

export {
  intercepts,
  Utils
};
