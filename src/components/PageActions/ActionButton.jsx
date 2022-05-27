// Global imports
import { Button } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import { PageAction } from '../../models';

export const DEFAULT_LABEL = 'Continue';
const ActionButton = ({
  action: _action,
  onAction,
  ...attrs
}) => {
  const action = typeof(_action) === 'string' ? PageAction.DEFAULTS[_action] : _action;
  const actionLabel = PageAction.DEFAULTS[_action.type];
  if (!action) {
    return null;
  }
  return (
    <Button
      {...attrs}
      className={action.className}
      classModifiers={action.classModifiers}
      start={action.start || false}
      onClick={() => onAction(action)}
    >
      {action.label || actionLabel?.label || DEFAULT_LABEL}
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
