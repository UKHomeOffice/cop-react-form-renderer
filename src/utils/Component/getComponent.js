// Global imports
import React from 'react';
import { Autocomplete, DateInput, Heading, InsetText, Markup, Radios, TextArea, TextInput } from '@ukhomeoffice/cop-react-components';

// Local imports
import cleanAttributes from './cleanAttributes';
import { ComponentTypes } from '../../models';
import Data from '../Data';
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

const getDate = (config) => {
  const attrs = cleanAttributes(config);
  return <DateInput {...attrs} />;
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
    case ComponentTypes.DATE:
      return getDate(config);
    default: {
      return null;
    }
  }
};

const getComponent = (config, wrap = true) => {
  const component = getComponentByType(config);
  if (component && wrap && isEditable(config)) {
    const attrs = cleanAttributes(config, ['fieldId', 'displayMenu']);
    return wrapInFormGroup(attrs, component);
  }
  return component;
};

export default getComponent;
