// Local imports
import { FormRenderer, SummaryList } from './components';
import { ValidationContextProvider } from './context';
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
  SummaryList,
  FormTypes,
  HubFormats,
  Utils,
  ValidationContextProvider
};

export default FormRenderer;
