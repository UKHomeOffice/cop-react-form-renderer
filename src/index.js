// Local imports
import FormRenderer from './components/FormRenderer';
import { addHook } from './hooks/useHooks';
import { FormTypes, HubFormats } from './models';
import Utils from './utils';

const intercepts = {
  add: addHook
};

export {
  intercepts,
  FormRenderer,
  FormTypes,
  HubFormats,
  Utils
};

export default FormRenderer;
