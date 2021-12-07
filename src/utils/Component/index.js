import cleanAttributes from './cleanAttributes';
import getComponent from './getComponent';
import isEditable from './isEditable';
import showComponent from './showComponent';
import wrapInFormGroup from './wrapInFormGroup';

const Component = {
  clean: cleanAttributes,
  get: getComponent,
  editable: isEditable,
  show: showComponent,
  wrap: wrapInFormGroup
};

export default Component;
