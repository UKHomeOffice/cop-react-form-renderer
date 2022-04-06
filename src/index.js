// Local imports
import FormRenderer from './components/FormRenderer';
import SummaryList from './components/SummaryList';
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
  Utils
};

export default FormRenderer;