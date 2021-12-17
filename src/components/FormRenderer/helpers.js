// Local imports
import { HubFormats } from '../../models';
import Utils from '../../utils';

export const getCYA = (pageId, hub) => {
  if (pageId === 'hub' && hub === HubFormats.CYA) {
    return { title: '' };
  } else if (pageId === HubFormats.CYA) {
    return {};
  }
  return undefined;
};

export const getPage = (pageId, pages, hub) => {
  if (pageId) {
    if (pageId === 'hub') {
      return hub === HubFormats.CYA ? undefined : hub;
    }
    return pages.find(p => p.id === pageId);
  }
  return undefined;
};

export const getFormState = (pageId, pages, hub) => {
  return {
    pageId,
    cya: getCYA(pageId, hub),
    page: getPage(pageId, pages, hub)
  };
};

export const canActionProceed = (action, page, onError) => {
  if (action.validate) {
    const errors = Utils.Validate.page(page.components, page.formData);
    onError(errors);
    return errors.length === 0;
  }
  return true;
};
