// Global imports
import PropTypes from 'prop-types';
import React from 'react';
import VisuallyHidden from '@ukhomeoffice/cop-react-components/dist/VisuallyHidden';

// Local imports
import FormComponent from '../FormComponent';

const Answer = ({ value, component }) => {
  if (!value) {
   return <VisuallyHidden>No answer</VisuallyHidden>;
   // return 'test text';
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
