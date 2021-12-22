// Local imports
import { FormTypes, HubFormats } from '../../models';
import FormPage from '../FormPage';

const getFormHub = (type, hub, components, formData) => {
  if (type === FormTypes.HUB && hub) {
    if (hub.format === HubFormats.CYA) {
      return HubFormats.CYA;
    }
    if (hub.components) {
      return FormPage.get(hub, components, formData);
    }
  }
  return undefined;
};

export default getFormHub;
