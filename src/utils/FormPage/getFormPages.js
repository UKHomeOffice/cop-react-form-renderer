// Local imports
import getFormPage from './getFormPage';

const getFormPages = (pages, components, formData) => {
  const formPages = [];
  if (Array.isArray(pages)) {
    pages.forEach((options, index) => {
      formPages.push({
        ...getFormPage(options, components, formData),
        index
      });
    });
  }
  return formPages;
};

export default getFormPages;
