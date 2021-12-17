// Local imports
import FormPage from '../FormPage';
import { FormTypes, HubFormats } from '../../models';

const getFormHub = (type, hub, components) => {
  if (type === FormTypes.HUB && hub) {
    if (hub.format === HubFormats.CYA) {
      return HubFormats.CYA;
    }
    if (hub.components) {
      return FormPage.get(hub, components);
    }
  }
  return undefined;
};

export default getFormHub;
