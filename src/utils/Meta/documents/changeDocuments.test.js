import { META_DOCUMENTS_PROPERTY, META_PROPERTY } from '../constants';
import changeDocuments from './changeDocuments';

describe('Utils.Meta.documents.change', () => {
  const ALPHA_DOCUMENT = { field: 'alpha', url: 'http://alpha-bravo.com/files/alpha' };
  const BRAVO_DOCUMENT = { field: 'bravo', url: 'http://alpha-bravo.com/files/bravo' };

  it('should return an appropriately set up object if formData is null', () => {
    expect(changeDocuments(ALPHA_DOCUMENT, null, ALPHA_DOCUMENT.field)).toEqual({
      [META_DOCUMENTS_PROPERTY]: [ ALPHA_DOCUMENT ]
    });
  });

  it('should add a new document to the array', () => {
    const FORM_DATA = {
      [META_PROPERTY]: {
        [META_DOCUMENTS_PROPERTY]: [ ALPHA_DOCUMENT ]
      }
    };
    expect(changeDocuments(BRAVO_DOCUMENT, FORM_DATA, BRAVO_DOCUMENT.field)).toEqual({
      [META_DOCUMENTS_PROPERTY]: [ALPHA_DOCUMENT, BRAVO_DOCUMENT]
    });
  });

  it('should replace an existing document with the same field', () => {
    const NEW_URL = 'http://replacement.com/files/alpha';
    const NEW_ALPHA = { field: ALPHA_DOCUMENT.field, url: NEW_URL };
    const FORM_DATA = {
      [META_PROPERTY]: {
        [META_DOCUMENTS_PROPERTY]: [ ALPHA_DOCUMENT ]
      }
    };
    expect(changeDocuments(NEW_ALPHA, FORM_DATA, NEW_ALPHA.field)).toEqual({
      [META_DOCUMENTS_PROPERTY]: [NEW_ALPHA]
    });
  });

  it('should handle a null document being passed where a document with that field already exists', () => {
    const FORM_DATA = {
      [META_PROPERTY]: {
        [META_DOCUMENTS_PROPERTY]: [ ALPHA_DOCUMENT ]
      }
    };
    expect(changeDocuments(null, FORM_DATA, ALPHA_DOCUMENT.field)).toEqual({
      [META_DOCUMENTS_PROPERTY]: []
    });
  });

  it('should handle a null document being passed where a document with that field does not already exist', () => {
    const FORM_DATA = {
      [META_PROPERTY]: {
        [META_DOCUMENTS_PROPERTY]: [ ALPHA_DOCUMENT ]
      }
    };
    expect(changeDocuments(null, FORM_DATA, BRAVO_DOCUMENT.field)).toEqual({
      [META_DOCUMENTS_PROPERTY]: [ ALPHA_DOCUMENT ]
    });
  });
});
