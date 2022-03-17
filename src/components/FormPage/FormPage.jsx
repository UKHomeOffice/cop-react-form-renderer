// Global imports
import { ErrorSummary, LargeHeading } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// Local imports.
import Utils from '../../utils';
import FormComponent from '../FormComponent';
import PageActions from '../PageActions';

// Styles
import './FormPage.scss';

export const DEFAULT_CLASS = 'hods-form';
const FormPage = ({
  page,
  onAction,
  classBlock,
  classModifiers,
  className
}) => {
  const [patch, setPatch] = useState({});
  const [errors, setErrors] = useState([]);

  /**
   * Handle the state of the data directly within the page.
   * This is so that the overall form data isn't affected until such
   * time as the onAction handler is invoked.
  */
  const onPageChange = ({ target }) => {
    page.formData[target.name] = target.value;
    setPatch(prev => ({
      ...prev,
      [target.name]: target.value
    }));
  };

  const onError = (errors) => {
    setErrors(errors);
  };

  const classes = Utils.classBuilder(classBlock, classModifiers, className);
  return (
    <div className={classes('page')} key={page.id}>
      {page.title && <LargeHeading>{page.title}</LargeHeading>}
      {errors && errors.length > 0 && <ErrorSummary errors={errors} />}
      {page.components.filter(c => Utils.Component.show(c, page.formData)).map((component, index) => (
        <FormComponent key={index}
          component={component}
          onChange={onPageChange}
          value={page.formData[component.fieldId] || ''}
        />
      ))}
      <PageActions actions={page.actions} onAction={(action) => onAction(action, patch, onError)} />
    </div>
  );
};

FormPage.propTypes = {
  page: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    components: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
    actions: PropTypes.array,
    formData: PropTypes.object.isRequired
  }).isRequired,
  onAction: PropTypes.func.isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

FormPage.defaultProps = {
  classBlock: DEFAULT_CLASS,
  classModifiers: []
};

export default FormPage;
