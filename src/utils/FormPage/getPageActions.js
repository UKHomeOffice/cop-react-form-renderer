import { PageAction } from '../../models';

const standardiseAction = (obj) => {
  const action = { ...obj };
  // This is in place for backwards compatibility with version 1.
  if (!action.page) {
    if (action.href) {
      action.page = action.href.split('/').pop();
    } else if (action.url) {
      action.page = action.url.split('/').pop();
    }
  }
  return action;
};

/**
 * Gets an array of standardised action objects for a page.
 * @param {object} page The page to get the actions for.
 * @returns Standardised action objects.
 * @description Standardises actions specified on a page into ones suitable for this version of the
 * Form Renderer.
 * 
 * `action.href` and `action.url` have been deprecated in favour of `action.page` but this method
 * will convert both by taking the final part of the relative path:
 * - `href: '/bravo'` => `page: 'bravo'`
 */
const getPageActions = (page) => {
  if (page && Array.isArray(page.actions)) {
    return page.actions.map(a => {
      if (typeof a === 'string') {
        return PageAction.DEFAULTS[a];
      }
      if (a && typeof a === 'object') {
        if(PageAction.DEFAULTS[a.type]?.validate){
          a.validate = true;
        }
        return standardiseAction(a);
      }
      return undefined;
    }).filter(a => !!a);
  }
  return undefined;
};

export default getPageActions;