// Local imports
import { ComponentTypes } from '../../models';

export const EDITABLE_TYPES = [
  ComponentTypes.AUTOCOMPLETE,
  ComponentTypes.EMAIL,
  ComponentTypes.PHONE_NUMBER,
  ComponentTypes.RADIOS,
  ComponentTypes.TEXT,
  ComponentTypes.TEXT_AREA,
  ComponentTypes.DATE
];

const isEditable = (options) => {
  return EDITABLE_TYPES.includes(options?.type);
};

export default isEditable;
