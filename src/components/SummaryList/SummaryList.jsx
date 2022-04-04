// Global imports
import { Utils } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import RowAction from './RowAction';

// Styles
import './SummaryList.scss';

export const DEFAULT_CLASS = 'govuk-summary-list';
const SummaryList = ({
  rows,
  noAction,
  invertWeight,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = Utils.classBuilder(classBlock, classModifiers, className);
  return (
    <dl {...attrs} className={classes()}>
      {rows.map((row) =>
        invertWeight ? (
          <div key={`${row.pageId}_${row.fieldId}`} className={classes('row')}>
            <dt className={classes('key caseview__key')}>{row.key}</dt>
            <dd className={classes('value caseview__value')}>{row.value}</dd>
            {!noAction && (
              <dd className={classes('actions')}>
                {row.action && <RowAction row={row} />}
              </dd>
            )}
          </div>
        ) : (
          <div key={`${row.pageId}_${row.fieldId}`} className={classes('row')}>
            <dt className={classes('key')}>{row.key}</dt>
            <dd className={classes('value')}>{row.value}</dd>
            {!noAction && (
              <dd className={classes('actions')}>
                {row.action && <RowAction row={row} />}
              </dd>
            )}
          </div>
        )
      )}
    </dl>
  );
};

SummaryList.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      pageId: PropTypes.string.isRequired,
      fieldId: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      value: PropTypes.any,
      action: PropTypes.shape({
        page: PropTypes.string,
        label: PropTypes.string,
        aria_suffix: PropTypes.string,
        onAction: PropTypes.func
      })
    })
  ).isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  className: PropTypes.string,
  noAction: PropTypes.bool,
  invertWeight: PropTypes.bool
};

SummaryList.defaultProps = {
  classBlock: DEFAULT_CLASS,
  noAction: false,
  invertWeight: false
};

export default SummaryList;
