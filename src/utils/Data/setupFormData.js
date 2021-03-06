import dayjs from 'dayjs';

// Local imports
import getSourceData from './getSourceData';

const setDefaultDateValue = (date, data) => {
  if (date.defaultValue === 'today') {
    data[date.fieldId] = dayjs().format('DD-MM-YYYY');
  } else {
    data[date.fieldId] = date.defaultValue;
  }
}

/** 
 * This currently will not work for collections or containers.
 * If support is required it will need to be added.
 */
const setupDefaultValue = (component, data) => {
  if (component.defaultValue && !data[component.fieldId]) {
    switch (component.type) {
      case 'date':
        setDefaultDateValue(component, data);
        break;
      default:
        data[component.fieldId] = component.defaultValue;
    }
  }
  if (component.defaultValue) {
    // Some components will throw warnings when having 
    // both a 'value' and 'defaultValue' prop set. 
    // defaultValue is safe to delete once we've tried
    // to use it.
    delete component.defaultValue;
  }
}

const setupDefaultValuesForComponents = (components, data) => {
  components.forEach(component => setupDefaultValue(component, data));
}

const setupPageDefaultValues = (pages, data) => {
  pages.forEach(page => {
    page.components.filter(c => !c.use).forEach(component => setupDefaultValue(component, data));
  });
};

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
 * This populates an object with data either from a specified default
 * value or from a source field. If both are specified, data from a
 * source field will take priority.
 * Note that in the case of source fields, this doesn't currently 
 * support sequenced dependencies:
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
  setupDefaultValuesForComponents(components, data);
  setupPageDefaultValues(pages, data);
  setupSourceDataForComponents(components, data);
  setupPageSourceData(pages, data);
  return data;
};

export default setupFormData;
