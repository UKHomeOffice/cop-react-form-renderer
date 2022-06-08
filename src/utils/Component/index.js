import cleanAttributes from './cleanAttributes';
import getComponent from './getComponent';
import getDefaultValue from './getDefaultValue';
import isEditable from './isEditable';
import showComponent from './showComponent';
import wrapInFormGroup from './wrapInFormGroup';

const Component = {
  clean: cleanAttributes,
  defaultValue: getDefaultValue,
  editable: isEditable,
  get: getComponent,
  show: showComponent,
  wrap: wrapInFormGroup
};

export default Component;
