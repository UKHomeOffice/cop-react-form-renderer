// Local imports
import getFormHub from './getFormHub';
import { HubFormats } from '../../models';

const Hub = {
  formats: HubFormats,
  get: getFormHub
};

export default Hub;
