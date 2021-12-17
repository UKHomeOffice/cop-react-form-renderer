// Global imports
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, VisuallyHidden } from '@ukhomeoffice/cop-react-components';

const RowAction = ({ row }) => {
  const [attrs, setAttrs] = useState({});
  useEffect(() => {
    let value = {};
    if (row.action) {
      if (typeof(row.action.onAction) === 'function') {
        value = { onClick: () => row.action.onAction(row) };
      } else {
        value = { href: row.action.href };
      }
    }
    setAttrs(value);
  }, [row, setAttrs]);
  return (
    <Link {...attrs}>
      {row.action.label}
      {row.action.aria_suffix && <VisuallyHidden>{row.action.aria_suffix}</VisuallyHidden>}
    </Link>
  );
};

RowAction.propTypes = {
  row: PropTypes.shape({
    action: PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      aria_suffix: PropTypes.string,
      onAction: PropTypes.func
    })
  }).isRequired
};


export default RowAction;