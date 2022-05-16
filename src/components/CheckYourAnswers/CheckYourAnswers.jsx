// Global imports
import {
  ErrorSummary,
  LargeHeading,
  MediumHeading
} from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';

// Local imports
import Utils from '../../utils';
import PageActions from '../PageActions';
import SummaryList from '../SummaryList';
import Answer from './Answer';

// Styles
import './CheckYourAnswers.scss';

export const DEFAULT_CLASS = 'hods-check-your-answers';
export const DEFAULT_TITLE = 'Check your answers';
export const DEFAULT_MARGIN_BOTTOM = 9;
const CheckYourAnswers = ({
  title,
  pages: _pages,
  actions,
  onAction,
  onRowAction,
  hide_page_titles,
  hide_actions,
  hide_title,
  summaryListClassModifiers,
  noChangeAction,
  groups
}) => {
  const [pages, setPages] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const getRows = (page, pageIndex) => {
      const rows = Utils.CheckYourAnswers.getRows(page, onRowAction);
      return rows.map((row, index) => ({
        ...row,
        value: (
          <Answer
            key={`${pageIndex}_${index}`}
            value={row.value}
            component={row.component}
          />
        )
      }));
    };

    setPages(
      _pages
        .map((page, index) => {
          const rows = getRows(page, index);
          return rows.length > 0 ? { ...page, rows } : null;
        })
        .filter((p) => !!p)
    );
  }, [_pages, onRowAction, setPages]);

  const listMarginBottom = hide_page_titles ? 0 : DEFAULT_MARGIN_BOTTOM;
  const isLastPage = (index) => {
    return index === pages.length - 1;
  };

  const onError = (errors) => {
    setErrors(errors);
  };

  const isGroup = (pageId) => {

    let groupId = [];
    
    groups !== undefined &&
      groups.length && pageId !== undefined && groups.forEach((group) => {
        const groupedTitle = group.pageId;
        groupId.push(groupedTitle);
        console.log(groupId);
        console.log(pageId);
      })
      console.log(groupId.includes(pageId));
      return(groupId.includes(pageId));
  }

  const groupedFields = (pageId) => {
  
    let groupAnswer;
    groups !== undefined &&
      groups.length && pageId !== undefined && groups.forEach((group) => {
        if (group.pageId === pageId) {
          groupAnswer = group;
        }
      })
    console.log(groupAnswer);
    return (groupAnswer);
}

  return (
    <div className={DEFAULT_CLASS}>
      {title && !hide_title && (
        <LargeHeading key='heading'>{title}</LargeHeading>
      )}
      {errors && errors.length > 0 && <ErrorSummary errors={errors} />}
      {pages &&
        pages.map((page, pageIndex, array) => {

         
          let pageMarginBottom = isLastPage(pageIndex)
            ? DEFAULT_MARGIN_BOTTOM
            : listMarginBottom;
          if (!isLastPage(pageIndex)) {
            pageMarginBottom = isGroup(array[pageIndex + 1].id)
              ? DEFAULT_MARGIN_BOTTOM
              : listMarginBottom
          }
          const currentGroup = groupedFields(page.id);
          const className = `govuk-!-margin-bottom-${pageMarginBottom}`;
          let hideActionButtons;
          isGroup(page.id) ? hideActionButtons = true : hideActionButtons = noChangeAction;
          return (
            <Fragment key={pageIndex}>
              {(!hide_page_titles && page.title)   && (
                <MediumHeading>{page.title}</MediumHeading>
              )}
              {(isGroup(page.id))   && (
                <MediumHeading>{currentGroup.title}</MediumHeading>
              )}
              <SummaryList
                className={className}
                rows={page.rows}
                classModifiers={summaryListClassModifiers}
                noChangeAction={hideActionButtons}
                isGroup={isGroup(page.id)}
                groupObject={currentGroup}
              />
            </Fragment>
          );
        })}
      {!hide_actions && (
        <PageActions
          actions={actions}
          onAction={(action) => onAction(action, onError)}
        />
      )}
    </div>
  );
};

CheckYourAnswers.propTypes = {
  title: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(PropTypes.object),
  onAction: PropTypes.func.isRequired,
  onRowAction: PropTypes.func.isRequired,
  hide_page_titles: PropTypes.bool,
  hide_actions: PropTypes.bool,
  hide_title: PropTypes.bool,
  summaryListClassModifiers: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  noChangeAction: PropTypes.bool,
};

CheckYourAnswers.defaultProps = {
  title: DEFAULT_TITLE,
  hide_page_titles: false,
  hide_actions: false,
  hide_title: false,
  summaryListClassModifiers: null,
  noChangeAction: false,
};

export default CheckYourAnswers;
