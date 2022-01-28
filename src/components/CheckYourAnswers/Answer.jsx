// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import FormComponent from '../FormComponent';

const Answer = ({ value, component }) => {
  if (!value) {
    return null;
  }
  if (!component) {
    return value;
  }
  return (
    <FormComponent component={{ ...component, readonly: true }} wrap={false} value={value} />
  );
};

Answer.propTypes = {
  value: PropTypes.any,
  component: PropTypes.object
};

export default Answer;
