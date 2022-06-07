// Local imports
import { META_DOCUMENTS_PROPERTY } from '../constants';
import changeDocuments from './changeDocuments';
import getDocuments from './getDocuments';

const documents = {
  change: changeDocuments,
  get: getDocuments,
  name: META_DOCUMENTS_PROPERTY
};

export default documents;