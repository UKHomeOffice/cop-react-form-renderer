// Global imports
import { ButtonGroup } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import ActionButton from './ActionButton';

const PageActions = ({ actions, onAction }) => {
  if (!actions || actions.length === 0) {
    return null;
  }
  return (
    <ButtonGroup>
      {actions.map((action, index) => <ActionButton key={index} action={action} onAction={onAction} />)}
    </ButtonGroup>
  );
};

PageActions.propTypes = {
  actions: PropTypes.array,
  onAction: PropTypes.func.isRequired
};

export default PageActions;
