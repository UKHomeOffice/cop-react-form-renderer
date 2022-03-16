// Local imports
import Component from '../Component';
import Data from '../Data';
import meetsCondition from '../meetsCondition';
import getEditableComponents from './getEditableComponents';

/**
 * Evaluates the show_when condition(s) on a page.
 * @param {object} page The page to consider.
 * @param {object} data The top-level form data.
 * @returns Boolean true if all show_when conditions are met; false otherwise.
 */
const evaluatePageShowWhen = (page, data) => {
  const show_when = Array.isArray(page.show_when) ? page.show_when : [page.show_when];
  let allConditionsMet = true;
  show_when.forEach(condition => {
    const sourceDataValue = Data.getSource(data, condition.field);
    allConditionsMet = allConditionsMet && meetsCondition(condition, sourceDataValue);
  });
  return allConditionsMet;
};

/**
 * Checks whether any of the editable components on a page should be shown.
 * @param {Array} editableComponents The editable components on the page.
 * @param {object} data The top-level form data.
 * @returns Boolean true if ANY of the editable components should be shown; false otherwise.
 */
const showEditableComponent = (editableComponents, data) => {
  return editableComponents.reduce((shown, component) => {
    return shown || Component.show(component, data);
  }, false);
};

/**
 * Indicates whether or not a page should be shown.
 * @param {object} page The page to consider.
 * @param {object} data The top-level form data.
 * @returns Boolean true if the page should be shown; false if not.
 */
const showFormPage = (page, data) => {
  if (!page) {
    return false;
  }

  // If the page has a show_when condition, we should evaluate that.
  if (page.show_when) {
    return evaluatePageShowWhen(page, data);
  }

  // If the page itself doesn't have a show_when, we need to make sure that if it
  // contains ANY editable components, at least one of them is shown.
  const editableComponents = getEditableComponents(page);
  if (editableComponents.length > 0) {
    return showEditableComponent(editableComponents, data);
  }

  // At this point, either the page has no show_when condition of its own, or
  // the page has no editable components. In either case, it should be shown.
  return true;
};

export default showFormPage;
