// Global imports
import {
  Autocomplete,
  Checkboxes,
  DateInput,
  FileUpload,
  Heading,
  InsetText,
  Markup,
  Radios,
  TextArea,
  TextInput,
  TimeInput,
} from '@ukhomeoffice/cop-react-components';
import React from 'react';

// Local imports
import { ComponentTypes } from '../../models';
import Data from '../Data';
import cleanAttributes from './cleanAttributes';
import isEditable from './isEditable';
import wrapInFormGroup from './wrapInFormGroup';

/** 
 * Separate function for each component type for the sake of
 * code clarity - having the additional bits and pieces in the
 * switch statement increases the cyclomatic complexity and
 * makes it much harder to follow what's going on.
 */

const getAutocomplete = (config) => {
  const attrs = cleanAttributes(config);
  const source = Data.getAutocompleteSource(config);
  return <Autocomplete {...attrs} source={source} />;
};

const getCheckboxes = (config) => {
  let options = [];
  Data.getOptions(config, (val) => {
    options = val;
  });
  const attrs = cleanAttributes(config);
  return <Checkboxes {...attrs} options={options} />;
};

const getDate = (config) => {
  const attrs = cleanAttributes(config);
  return <DateInput {...attrs} />;
};

const getFileUpload = (config) => {
  const attrs = cleanAttributes(config);
  return <FileUpload {...attrs} />;
};

const getHeading = (config) => {
  const attrs = cleanAttributes(config);
  return <Heading {...attrs}>{config.content}</Heading>;
};

const getHTML = (config) => {
  const attrs = cleanAttributes(config);
  return <Markup {...attrs} />;
};

const getInsetText = (config) => {
  const attrs = cleanAttributes(config);
  return <InsetText {...attrs}>{config.content}</InsetText>;
};

const getRadios = (config) => {
  let options = [];
  Data.getOptions(config, (val) => {
    options = val;
  });

  options.forEach((option) => {
    if (option.nested) {
      option.nestedJSX = getComponent(option.nested);
    }
  });

  const attrs = cleanAttributes(config);
  return <Radios {...attrs} options={options} />;
};

const getTextArea = (config) => {
  const attrs = cleanAttributes(config);
  return <TextArea {...attrs} />;
};

const getTextInput = (config) => {
  const attrs = cleanAttributes(config);
  return <TextInput {...attrs} />;
};

const getTime = (config) => {
  const attrs = cleanAttributes(config);
  return <TimeInput {...attrs} />;
};


const getComponentByType = (config) => {
  switch (config.type) {
    case ComponentTypes.HTML:
      return getHTML(config);
    case ComponentTypes.HEADING:
      return getHeading(config);
    case ComponentTypes.INSET_TEXT:
      return getInsetText(config);
    case ComponentTypes.TEXT:
    case ComponentTypes.EMAIL:
    case ComponentTypes.PHONE_NUMBER:
      return getTextInput(config);
    case ComponentTypes.TEXT_AREA:
      return getTextArea(config);
    case ComponentTypes.AUTOCOMPLETE:
      return getAutocomplete(config);
    case ComponentTypes.RADIOS:
      return getRadios(config);
    case ComponentTypes.CHECKBOXES:
      return getCheckboxes(config);
    case ComponentTypes.DATE:
      return getDate(config);
    case ComponentTypes.TIME:
      return getTime(config);
    case ComponentTypes.FILE:
      return getFileUpload(config);
    default: {
      return null;
    }
  }
};

/**
 * Get a renderable component, based on a configuration object.
 * @param {object} config The configuration object for the component.
 * @param {boolean} wrap Indicates whether or not the component should be wrapped.
 * @param {Function} fnOverride An optional override function for component rendering.
 * @returns A renderable component.
 */
const getComponent = (config, wrap = true, fnOverride = undefined) => {
  if (typeof fnOverride === 'function') {
    const overrideComponent = fnOverride(config, wrap);
    if (overrideComponent) {
      return overrideComponent;
    }
  }
  const component = getComponentByType(config);
  if (component && wrap && isEditable(config)) {
    const attrs = cleanAttributes(config, ['fieldId', 'displayMenu']);
    return wrapInFormGroup(attrs, component);
  }
  return component;
};

export default getComponent;
