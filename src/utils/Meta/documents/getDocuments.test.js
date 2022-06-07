import { META_DOCUMENTS_PROPERTY, META_PROPERTY } from '../constants';
import getDocuments from './getDocuments';

describe('Utils.Meta.documents.get', () => {
  it('should return an empty array if formData is null', () => {
    expect(getDocuments(null)).toEqual([]);
  });
  it('should return an empty array if formData does not contain a meta property', () => {
    expect(getDocuments({})).toEqual([]);
  });
  it('should return an empty array if the meta property is undefined', () => {
    const FORM_DATA = {
      [META_PROPERTY]: undefined
    };
    expect(getDocuments(FORM_DATA)).toEqual([]);
  });
  it('should return an empty array if the meta property contains no documents property', () => {
    const FORM_DATA = {
      [META_PROPERTY]: {}
    };
    expect(getDocuments(FORM_DATA)).toEqual([]);
  });
  it('should return an empty array if the meta.documents property is undefined', () => {
    const FORM_DATA = {
      [META_PROPERTY]: {
        [META_DOCUMENTS_PROPERTY]: undefined
      }
    };
    expect(getDocuments(FORM_DATA)).toEqual([]);
  });
  it('should return the meta.documents property if it exists', () => {
    const DOCUMENTS = [
      { field: 'alpha', url: 'http://alpha-bravo.com/files/charlie' }
    ];
    const FORM_DATA = {
      [META_PROPERTY]: {
        [META_DOCUMENTS_PROPERTY]: DOCUMENTS
      }
    };
    expect(getDocuments(FORM_DATA)).toEqual(DOCUMENTS);
  });
});
