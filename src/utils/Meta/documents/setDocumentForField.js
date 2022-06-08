// Local imports
import { META_PROPERTY, META_DOCUMENTS_PROPERTY } from '../constants';
import getDocuments from './getDocuments';

const setDocumentForField = (document, formData, field) => {
  const documents = getDocuments(formData).filter(d => d.field !== field);
  if (document) {
    documents.push({ ...document, field });
  }
  const existing = formData ? formData[META_PROPERTY] : undefined;
  return {
    ...existing,
    [META_DOCUMENTS_PROPERTY]: documents
  };
};

export default setDocumentForField;
