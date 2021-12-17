// Local imports
import getSourceData from './getSourceData';

const setupComponentSourceData = (component, data) => {
  if (component.source) {
    data[component.fieldId] = getSourceData(data, component.source.field);
  }
};

const setupSourceDataForComponents = (components, data) => {
  components.forEach(component => setupComponentSourceData(component, data));
};

const setupPageSourceData = (pages, data) => {
  pages.forEach(page => {
    page.components.filter(c => !c.use).forEach(component => setupComponentSourceData(component, data));
  });
};

/**
 * This populates an object with data from source fields.
 * Note that this doesn't currently support sequenced dependencies:
 *    0: fieldA: source.field = fieldB
 *    1: fieldB: source.field = fieldC
 *    2: fieldC: 'value'
 * In the above example, fieldA will not get a value as fieldB isn't
 * set until after fieldA is processed.
 * @param {Array} pages 
 * @param {Array} components 
 * @param {object} baseData 
 * @returns 
 */
const setupFormData = (pages, components, baseData) => {
  const data = {...baseData};
  setupSourceDataForComponents(components, data);
  setupPageSourceData(pages, data);
  return data;
};

export default setupFormData;
