import { ComponentTypes } from '../../models';

const DEFAULT_VALUES = {
  [ComponentTypes.COLLECTION]: [],
  [ComponentTypes.CONTAINER]: {},
  [ComponentTypes.FILE]: {}
};

const getDefaultValue = (component) => {
  if (component) {
    return DEFAULT_VALUES[component.type] || '';
  }
  return '';
};

export default getDefaultValue;
