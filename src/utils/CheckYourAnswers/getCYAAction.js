/**
 * Gets an action object, configured appropriately for a Check your answers component.
 * 
 * @param {boolean} readonly Whether or not the component is readonly.
 * @param {object} cya_link A configuration object for any link to show.
 * @param {Function} onAction A function to invoke if the link is clicked.
 * 
 * @returns An action object for a Check your answers row.
 */
const getCYAAction = (readonly, cya_link, onAction) => {
  if (readonly !== true && cya_link) {
    return {
      href: cya_link.url || '#',
      label: cya_link.label || 'Change',
      aria_suffix: cya_link.aria_suffix,
      onAction
    };
  }
  return null;
};

export default getCYAAction;
