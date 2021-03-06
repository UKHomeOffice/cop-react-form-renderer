// Local imports
import { ComponentTypes } from '../../models';

export const EDITABLE_TYPES = [
  ComponentTypes.AUTOCOMPLETE,
  ComponentTypes.CALCULATION,
  ComponentTypes.CHECKBOXES,
  ComponentTypes.DATE,
  ComponentTypes.EMAIL,
  ComponentTypes.FILE,
  ComponentTypes.PHONE_NUMBER,
  ComponentTypes.RADIOS,
  ComponentTypes.SELECT,
  ComponentTypes.TEXT,
  ComponentTypes.TEXT_AREA,
  ComponentTypes.TIME
];

const isEditable = (options) => {
  return EDITABLE_TYPES.includes(options?.type);
};

export default isEditable;
