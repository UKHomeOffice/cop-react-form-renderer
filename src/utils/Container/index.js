import getEditableComponents from './getEditableComponents';
import setupNesting from './setupNesting';
import showContainer from './showContainer';

const Container = {
  editableComponents: getEditableComponents,
  setup: setupNesting,
  show: showContainer
};

export default Container;
