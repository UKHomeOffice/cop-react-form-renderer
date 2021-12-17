// Global imports
import React from 'react';
import PropTypes from 'prop-types';
import { Utils } from '@ukhomeoffice/cop-react-components';

// Local imports
import RowAction from './RowAction';

// Styles
import './SummaryList.scss';
import FormComponent from '../FormComponent';

export const DEFAULT_CLASS = 'govuk-summary-list';
const SummaryList = ({
  rows,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = Utils.classBuilder(classBlock, classModifiers, className);
  return (
    <dl {...attrs } className={classes()}>
      {rows.map((row, index) => (
        <div key={index} className={classes('row')}>
          <dt className={classes('key')}>{row.key}</dt>
          <dd className={classes('value')}>
            {row.component && row.value ?
              <FormComponent component={{ ...row.component, readonly: true}} noWrap={true} value={row.value} />
              :
              row.value
            }
          </dd>
          {row.action &&
            <dd className={classes('actions')}>
              <RowAction row={row} />
            </dd>
          }
        </div>
      ))}
    </dl>
  );
};

SummaryList.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    pageId: PropTypes.string.isRequired,
    fieldId: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    value: PropTypes.any,
    action: PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      aria_suffix: PropTypes.string,
      onAction: PropTypes.func
    })
  })).isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

SummaryList.defaultProps = {
  classBlock: DEFAULT_CLASS
};

export default SummaryList;
