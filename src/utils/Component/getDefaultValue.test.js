import { ComponentTypes } from '../../models';
import getDefaultValue from './getDefaultValue';

describe('utils.Component.defaultValue', () => {

  it('should return an empty string if the component is undefined', () => {
    expect(getDefaultValue(undefined)).toEqual('');
  });
  it('should return an empty string if the component is null', () => {
    expect(getDefaultValue(null)).toEqual('');
  });
  it('should return an empty string if the component has no type', () => {
    expect(getDefaultValue({})).toEqual('');
  });
  it('should return an empty string if the component type is null', () => {
    expect(getDefaultValue({ type: null })).toEqual('');
  });
  it('should return an empty string if the component type is undefined', () => {
    expect(getDefaultValue({ type: undefined })).toEqual('');
  });
  it(`should return an empty array if the component type is 'collection'`, () => {
    expect(getDefaultValue({ type: ComponentTypes.COLLECTION })).toEqual([]);
  });
  it(`should return an empty object if the component type is 'container'`, () => {
    expect(getDefaultValue({ type: ComponentTypes.CONTAINER })).toEqual({});
  });
  it(`should return an empty object if the component type is 'file'`, () => {
    expect(getDefaultValue({ type: ComponentTypes.FILE })).toEqual({});
  });
  Object.values(ComponentTypes).forEach(value => {
    if (![ComponentTypes.COLLECTION, ComponentTypes.CONTAINER, ComponentTypes.FILE].includes(value)) {
      it(`should return an empty object if the component type is '${value}'`, () => {
        expect(getDefaultValue({ type: ComponentTypes.TEXT })).toEqual('');
      });
    }
  });

});
