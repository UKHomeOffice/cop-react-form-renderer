// Local imports
import getAutocompleteSource from './getAutocompleteSource';
import getOptions from './getOptions';
import getRefData, { getRefDataItemName } from './refData';
import getSourceData from './getSourceData';

const Data = {
  getAutocompleteSource,
  getOptions,
  getSource: getSourceData,
  refData: {
    get: getRefData,
    getItemName: getRefDataItemName
  },
};

export default Data;
