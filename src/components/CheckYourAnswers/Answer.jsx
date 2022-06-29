// Global imports
import PropTypes from 'prop-types';
import React from 'react';
import VisuallyHidden from '@ukhomeoffice/cop-react-components/dist/VisuallyHidden';

// Local imports
import FormComponent from '../FormComponent';

const Answer = ({ value, component, formData }) => {
  if (!value) {
   return <VisuallyHidden>No answer</VisuallyHidden>;
  }
  if (!component) {
    return value;
  }
  return (
    <FormComponent formData={formData} component={{ ...component, readonly: true }} wrap={false} value={value} />
  );
};

Answer.propTypes = {
  value: PropTypes.any,
  component: PropTypes.object,
  formData: PropTypes.object
};

export default Answer;
