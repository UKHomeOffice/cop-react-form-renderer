// Global imports
import { Link, VisuallyHidden } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Local imports
import { getRowActionAttributes } from './helpers';

const RowAction = ({ row }) => {
  const [attrs, setAttrs] = useState({});
  useEffect(() => {
    setAttrs(getRowActionAttributes(row));
  }, [row, setAttrs]);

  if (!row.action) {
    return null;
  }

  return (
    <Link {...attrs} tabIndex='0'>
      {row.action.label}
      {row.action.aria_suffix && <VisuallyHidden> {row.action.aria_suffix}</VisuallyHidden>}
    </Link>
  );
};

RowAction.propTypes = {
  row: PropTypes.shape({
    action: PropTypes.shape({
      label: PropTypes.string.isRequired,
      page: PropTypes.string,
      aria_suffix: PropTypes.string,
      onAction: PropTypes.func
    })
  }).isRequired
};

export default RowAction;
