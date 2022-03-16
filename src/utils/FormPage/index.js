import getEditableComponents from './getEditableComponents';
import getFormPage from './getFormPage';
import getFormPages from './getFormPages';
import showFormPage from './showFormPage';

const FormPage = {
  editableComponents: getEditableComponents,
  get: getFormPage,
  getAll: getFormPages,
  show: showFormPage
};

export default FormPage;
