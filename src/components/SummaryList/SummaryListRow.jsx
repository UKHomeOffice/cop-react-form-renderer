// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import RowAction from './RowAction';

const SummaryListRow = ({ row, classes, showAction }) => (
  <div className={classes('row')}>
    <dt className={classes('key')}>
      {row.key}
      {!row.required && ` (optional)`}
    </dt>
    <dd className={classes('value')}>{row.value}</dd>
    {showAction && (
      <dd className={classes('actions')}>
        {row.action && <RowAction row={row} />}
      </dd>
    )}
  </div>
);

SummaryListRow.propTypes = {
  row: PropTypes.shape({
    key: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: PropTypes.any,
    action: PropTypes.shape({
      page: PropTypes.string,
      label: PropTypes.string,
      aria_suffix: PropTypes.string,
      onAction: PropTypes.func
    })
  }).isRequired,
  classes: PropTypes.func.isRequired,
  showAction: PropTypes.bool
};

export default SummaryListRow;
