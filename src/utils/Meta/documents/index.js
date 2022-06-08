// Local imports
import { META_DOCUMENTS_PROPERTY } from '../constants';
import setDocumentForField from './setDocumentForField';
import getDocuments from './getDocuments';

const documents = {
  setForField: setDocumentForField,
  get: getDocuments,
  name: META_DOCUMENTS_PROPERTY
};

export default documents;
