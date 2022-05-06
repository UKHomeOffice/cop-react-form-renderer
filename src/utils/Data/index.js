// Local imports
import getAutocompleteSource from './getAutocompleteSource';
import getDataPath from './getDataPath';
import getOptions from './getOptions';
import getSourceData from './getSourceData';
import refDataToOptions from './refDataToOptions';
import setupFormData from './setupFormData';
import setupRefDataUrlForComponent from './setupRefDataUrlForComponent';

const Data = {
  getAutocompleteSource,
  getDataPath,
  getOptions,
  getSource: getSourceData,
  refData: {
    setupUrl: setupRefDataUrlForComponent,
    toOptions: refDataToOptions
  },
  setupForm: setupFormData
};

export default Data;
