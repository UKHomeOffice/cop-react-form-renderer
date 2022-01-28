// Local imports
import FormRenderer from './components/FormRenderer';
import { addHook, removeHook, resetHooks } from './hooks/useHooks';
import { FormTypes, HubFormats } from './models';
import Utils from './utils';

const intercepts = {
  add: addHook,
  remove: removeHook,
  reset: resetHooks
};

export {
  intercepts,
  FormRenderer,
  FormTypes,
  HubFormats,
  Utils
};

export default FormRenderer;
