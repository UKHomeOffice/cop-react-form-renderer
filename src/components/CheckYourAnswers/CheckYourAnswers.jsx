// Global imports
import { LargeHeading, MediumHeading } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

// Local imports
import Utils from '../../utils';
import SummaryList from '../SummaryList';
import Answer from './Answer';

// Styles
import './CheckYourAnswers.scss';

export const DEFAULT_MARGIN_BOTTOM = 9;
const CheckYourAnswers = ({
  title,
  pages,
  hide_page_titles,
  onAction
}) => {
  const listMarginBottom = hide_page_titles ? 0 : DEFAULT_MARGIN_BOTTOM;
  const isLastPage = (index) => {
    return index === pages.length -1;
  };
  const getRows = (page, index) => {
    const rows = Utils.CheckYourAnswers.getRows(page, onAction);
    return rows.map(row => ({
      ...row,
      value: <Answer key={index} value={row.value} component={row.component} />
    }));
  };
  return (
    <div className="hods-check-your-answers">
      {title && <LargeHeading key="heading">{title}</LargeHeading>}
      {pages && pages.map((page, pageIndex) => {
        const rows = getRows(page, pageIndex);
        if (rows.length === 0) {
          return null;
        }
        const pageMarginBottom = isLastPage(pageIndex) ? DEFAULT_MARGIN_BOTTOM : listMarginBottom;
        const className = `govuk-!-margin-bottom-${pageMarginBottom}`;
        return (
          <Fragment key={pageIndex}>
            {!hide_page_titles && page.title && <MediumHeading>{page.title}</MediumHeading>}
            <SummaryList className={className} rows={rows} />
          </Fragment>
        );
      })}
    </div>
  )
};

CheckYourAnswers.propTypes = {
  title: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
  hide_page_titles: PropTypes.bool
};

CheckYourAnswers.defaultProps = {
  title: 'Check your answers',
  hide_page_titles: false
};

export default CheckYourAnswers;
