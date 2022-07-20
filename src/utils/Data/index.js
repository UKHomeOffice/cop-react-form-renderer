// Local imports
import applyFormula from './applyFormula';
import getAutocompleteSource from './getAutocompleteSource';
import getDataPath from './getDataPath';
import getOptions from './getOptions';
import getSourceData from './getSourceData';
import refDataToOptions from './refDataToOptions';
import setDataItem from './setDataItem';
import setupFormData from './setupFormData';
import setupRefDataUrlForComponent from './setupRefDataUrlForComponent';

const Data = {
  applyFormula,
  getAutocompleteSource,
  getDataPath,
  getOptions,
  getSource: getSourceData,
  refData: {
    setupUrl: setupRefDataUrlForComponent,
    toOptions: refDataToOptions
  },
  setDataItem,
  setupForm: setupFormData
};

export default Data;
