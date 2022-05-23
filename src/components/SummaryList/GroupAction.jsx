// Global imports
import React, { useEffect, useState } from 'react';
import { Link } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';

// Local imports
import getGroupActionAttributes from './helpers/getGroupActionAttributes';

const GroupAction = ({ group }) => {
  const [attrs, setAttrs] = useState({});

  useEffect(() => {
    setAttrs(getGroupActionAttributes(group));
  }, [group, setAttrs]);

  if (!group.action) {
    return null;
  }

  return (
    <Link {...attrs}>
      {group.action.label}
      {group.action.aria_suffix && (
        <span className='mobile-text govuk-link'>{' '}{`${group.action.aria_suffix}`}</span>
      )}
    </Link>
  );
};

GroupAction.propTypes = {
  group: PropTypes.shape({
    action: PropTypes.shape({
      label: PropTypes.string.isRequired,
      page: PropTypes.string,
      aria_suffix: PropTypes.string,
      onAction: PropTypes.func
    })
  }).isRequired
};

export default GroupAction;
