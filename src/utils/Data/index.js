// Local imports
import getAutocompleteSource from './getAutocompleteSource';
import getOptions from './getOptions';
import getSourceData from './getSourceData';
import refDataToOptions from './refDataToOptions';
import setupRefDataUrlForComponent from './setupRefDataUrlForComponent';

const Data = {
  getAutocompleteSource,
  getOptions,
  getSource: getSourceData,
  refData: {
    setupUrl: setupRefDataUrlForComponent,
    toOptions: refDataToOptions
  },
};

export default Data;
