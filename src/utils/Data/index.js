// Local imports
import getAutocompleteSource from './getAutocompleteSource';
import getDataPath from './getDataPath';
import getOptions from './getOptions';
import getSourceData from './getSourceData';
import refDataToOptions from './refDataToOptions';
import setDataItem from './setDataItem';
import setupFormData from './setupFormData';
import setupRefDataUrlForComponent from './setupRefDataUrlForComponent';
import applyFormula from './applyFormula';

const Data = {
  getAutocompleteSource,
  getDataPath,
  getOptions,
  getSource: getSourceData,
  refData: {
    setupUrl: setupRefDataUrlForComponent,
    toOptions: refDataToOptions
  },
  setDataItem,
  setupForm: setupFormData,
  applyFormula
};

export default Data;
