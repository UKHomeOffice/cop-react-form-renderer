// Global imports
import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@ukhomeoffice/cop-react-components';

export const DEFAULT_LABEL = 'Continue';
export const DEFAULT_ACTIONS = {
  submit: { type: 'submit', validate: true }
};
const PageActions = ({ actions, onAction }) => {
  const getAction = (action, index) => {
    const props = typeof(action) === 'string' ? DEFAULT_ACTIONS[action] : action;
    return (
      <Button key={index} className={props.className} onClick={() => onAction(props)}>
        {props.label || DEFAULT_LABEL}
      </Button>
    );
  };
  return (
    <ButtonGroup>
      {actions.map(getAction)}
    </ButtonGroup>
  );
};

PageActions.propTypes = {
  actions: PropTypes.array.isRequired
};

export default PageActions;
