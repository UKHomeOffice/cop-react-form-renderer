// Local imports
import { META_PROPERTY, META_DOCUMENTS_PROPERTY } from '../constants';

const getDocuments = (formData) => {
  if (formData && formData[META_PROPERTY]) {
    return formData[META_PROPERTY][META_DOCUMENTS_PROPERTY] || [];
  }
  return [];
};

export default getDocuments;
