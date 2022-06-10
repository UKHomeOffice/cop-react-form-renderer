// Global imports
import { SmallHeading } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React from 'react';

const SummaryListTitleRow = ({ title, classes }) => (
  <div className={`${classes('row')} ${classes('title')}`}>
    <SmallHeading>{title}</SmallHeading>
  </div>
);

SummaryListTitleRow.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.func.isRequired
};

export default SummaryListTitleRow;
