/**
 * Gets an action object, configured appropriately for a Check your answers component.
 * 
 * @param {boolean} readonly Whether or not the component is readonly.
 * @param {object} page A configuration object for the page to link to.
 * @param {Function} onAction A function to invoke if the link is clicked.
 * 
 * @returns An action object for a Check your answers row.
 */
const getCYAAction = (readonly, page, onAction) => {
  const cya_link = page?.cya_link;
  if (readonly !== true && cya_link) {
    return {
      page: cya_link.page || page.id || '#',
      label: cya_link.label || 'Change',
      aria_suffix: cya_link.aria_suffix,
      onAction
    };
  }
  return null;
};

export default getCYAAction;
