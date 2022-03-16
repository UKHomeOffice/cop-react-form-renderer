import Component from '../Component';

/**
 * Gets all the editable components on a page.
 * @param {object} page The page to consider.
 * @returns An array of ONLY the editable components on a page.
 */
const getEditableComponents = (page) => {
  if (page && Array.isArray(page.components)) {
    return page.components.filter(c => Component.editable(c));
  }
  return [];
};

export default getEditableComponents;
