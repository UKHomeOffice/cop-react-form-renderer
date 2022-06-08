// Global imports
import { Utils } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import GroupAction from './GroupAction';
import SummaryListRow from './SummaryListRow';
import SummaryListTitleRow from './SummaryListTitleRow';

// Styles
import './SummaryList.scss';

export const DEFAULT_CLASS = 'govuk-summary-list';
const SummaryList = ({
  rows,
  noChangeAction,
  isGroup,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = Utils.classBuilder(classBlock, classModifiers, className);
  let groupActionRow = null;
  if (isGroup) {
    const rowActions = rows.filter(r => !!r.action);
    groupActionRow = rowActions.length > 0 ? rowActions[0] : null;
  }
  return (
    <div className="group-of-rows">
      <dl {...attrs} className={classes()}>
        {rows.map((row) => {
          const key = `${row.pageId}_${row.full_path || row.fieldId}`;
          if (row.type === 'title') {
            return <SummaryListTitleRow key={key} title={row.key} classes={classes} />;
          }
          return <SummaryListRow key={key} row={row} classes={classes} showAction={!noChangeAction} />;
        })}
        {isGroup &&
          <div className='change-group-button'>
            <GroupAction group={groupActionRow} />
          </div>
        }
      </dl>
    </div>
  );
};

SummaryList.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      pageId: PropTypes.string.isRequired,
      fieldId: PropTypes.string.isRequired,
      full_path: PropTypes.string,
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
  noChangeAction: PropTypes.bool,
  isGroup: PropTypes.bool,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  className: PropTypes.string
};

SummaryList.defaultProps = {
  classBlock: DEFAULT_CLASS,
  noChangeAction: false,
};

export default SummaryList;
