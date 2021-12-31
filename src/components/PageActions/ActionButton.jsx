// Global imports
import { Button } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React from 'react';

export const DEFAULT_LABEL = 'Continue';
export const DEFAULT_ACTIONS = {
  submit: { type: 'submit', validate: true }
};
const ActionButton = ({
  action: _action,
  onAction,
  ...attrs
}) => {
  const action = typeof(_action) === 'string' ? DEFAULT_ACTIONS[_action] : _action;
  if (!action) {
    return null;
  }
  return (
    <Button {...attrs} className={action.className} classModifiers={action.classModifiers} onClick={() => onAction(action)}>
      {action.label || DEFAULT_LABEL}
    </Button>
  );
};

ActionButton.propTypes = {
  action: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired,
  onAction: PropTypes.func.isRequired
};

ActionButton.defaultProps = {
  action: ''
};

export default ActionButton;
