// Global imports
import { LargeHeading, MediumHeading } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';

// Local imports
import Utils from '../../utils';
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
  hide_page_titles,
  onAction
}) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const getRows = (page, pageIndex) => {
      const rows = Utils.CheckYourAnswers.getRows(page, onAction);
      return rows.map((row, index) => ({
        ...row,
        value: <Answer key={`${pageIndex}_${index}`} value={row.value} component={row.component} />
      }));
    };

    setPages(_pages.map((page, index) => {
      const rows = getRows(page, index);
      return rows.length > 0 ? { ...page, rows } : null;
    }).filter(p => !!p));
  }, [_pages, onAction, setPages]);

  const listMarginBottom = hide_page_titles ? 0 : DEFAULT_MARGIN_BOTTOM;
  const isLastPage = (index) => {
    return index === pages.length -1;
  };

  return (
    <div className={DEFAULT_CLASS}>
      {title && <LargeHeading key="heading">{title}</LargeHeading>}
      {pages && pages.map((page, pageIndex) => {
        const pageMarginBottom = isLastPage(pageIndex) ? DEFAULT_MARGIN_BOTTOM : listMarginBottom;
        const className = `govuk-!-margin-bottom-${pageMarginBottom}`;
        return (
          <Fragment key={pageIndex}>
            {!hide_page_titles && page.title && <MediumHeading>{page.title}</MediumHeading>}
            <SummaryList className={className} rows={page.rows} />
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
  title: DEFAULT_TITLE,
  hide_page_titles: false
};

export default CheckYourAnswers;
