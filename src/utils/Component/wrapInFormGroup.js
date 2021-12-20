// Global imports
import React from 'react';
import { FormGroup } from '@ukhomeoffice/cop-react-components';

const wrapInFormGroup = (config, children) => (
  <FormGroup {...config} onChange={null}>
    {children}
  </FormGroup>
);

export default wrapInFormGroup;
