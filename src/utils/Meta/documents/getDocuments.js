// Local imports
import { META_PROPERTY, META_DOCUMENTS_PROPERTY } from '../constants';

const getDocuments = (formData) => {
  return formData?.[META_PROPERTY]?.[META_DOCUMENTS_PROPERTY] || [];
};

export default getDocuments;
