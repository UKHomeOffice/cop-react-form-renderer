// Local imports
import getCYARow from './getCYARow';
import showComponentCYA from './showComponentCYA';

const getCYARowsForPage = (page, onAction) => {
  return page.components.filter(c => showComponentCYA(c, page.formData)).map(component => {
    return getCYARow(page, component, onAction);
  });
};

export default getCYARowsForPage;
