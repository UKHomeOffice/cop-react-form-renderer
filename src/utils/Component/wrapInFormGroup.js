// Global imports
import { FormGroup } from '@ukhomeoffice/cop-react-components';
import React from 'react';

// Local imports
import cleanAttributes from './cleanAttributes';

const wrapInFormGroup = (config, children) => {
  const attrs = cleanAttributes(config, ['fieldId', 'displayMenu']);
  return (
    <FormGroup {...attrs} onChange={null}>
      {children}
    </FormGroup>
  )
};

export default wrapInFormGroup;
