// Local imports
import { FormTypes, HubFormats } from '../../models';
import FormPage from '../FormPage';

/**
 * Gets a configuration object (or a string) for the hub.
 * 
 * @param {string} type The type of the form.
 * @param {object} hub The configuration direct from the JSON.
 * @param {Array} components The top-level form components.
 * @param {object} formData The top-level form data.
 * 
 * @returns:
 *  undefined if the form type is not "hub-and-spoke", or;
 *  The string "CYA" if the CYA screen should be used, or;
 *  A page configuration object if the CYA screen should not be used and components are defined.
 */
const getFormHub = (type, hub, components, formData) => {
  if (type === FormTypes.HUB && hub) {
    if (hub.format === HubFormats.CYA) {
      return HubFormats.CYA;
    }
    if (hub.components) {
      return FormPage.get(hub, components, formData);
    }
  }
  if(type === FormTypes.TASK && hub){
    return HubFormats.TASK;
  }
  return undefined;
};

export default getFormHub;
