const getPageFromCYALink = (link) => {
  if (link.page) {
    return link.page;
  }
  const url = link.href || link.url;
  if (url) {
    return url.split('/').pop();
  }
  return undefined;
};

/**
 * Gets an action object, configured appropriately for a Check your answers component.
 * 
 * @param {boolean} readonly Whether or not the component is readonly.
 * @param {object} page A configuration object for the page to link to.
 * @param {Function} onAction A function to invoke if the link is clicked.
 * 
 * @returns An action object for a Check your answers row.
 * @description
 * `cya_link.href` and `cya_link.url` have been deprecated in favour of `cya_link.page` but this
 * method will convert both by taking the final part of the relative path:
 * - `href: '/bravo'` => `page: 'bravo'`
 */
const getCYAAction = (readonly, page, onAction) => {
  const cya_link = page?.cya_link;
  if (readonly !== true && cya_link) {
    return {
      page: getPageFromCYALink(cya_link) || page.id || '#',
      label: cya_link.label || 'Change',
      aria_suffix: cya_link.aria_suffix,
      onAction
    };
  }
  return null;
};

export default getCYAAction;
