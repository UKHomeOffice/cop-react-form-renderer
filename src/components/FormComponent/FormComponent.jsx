// Global imports
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Local imports
import { STATUS_COMPLETE, useValidation, useHooks, useRefData } from '../../hooks';
import { ComponentTypes } from '../../models';
import Utils from '../../utils';
import Collection from './Collection';
import Container from './Container';
import { getComponentError } from './helpers';

const FormComponent = ({
  component,
  value,
  formData,
  wrap,
  onChange,
  ...attrs
}) => {
  const { hooks } = useHooks();
  const validation = useValidation();
  const { data, status } = useRefData(component);
  const [ options, setOptions ] = useState([]);
  useEffect(() => {
    if (status === STATUS_COMPLETE) {
      setOptions(data);
    }
  }, [component, data, status]);

  const onComponentChange = ({ target }) => {
    if (typeof onChange === 'function') {
      onChange({ target });
      return true;
    }
    return false;
  };

  if (component.type === ComponentTypes.CONTAINER) {
    return (
      <Container
        {...attrs}
        container={component}
        wrap={wrap}
        onChange={onComponentChange}
        value={value || Utils.Component.defaultValue(component)}
        formData={formData}
      />
    );
  }

  if (component.type === ComponentTypes.COLLECTION) {
    return (
      <Collection
        {...attrs}
        config={component}
        wrap={wrap}
        onChange={onComponentChange}
        value={value || Utils.Component.defaultValue(component)}
        formData={formData}
      />
    );
  }

  const changeMetaDocuments = (document) => {
    onChange({
      target: {
        name: Utils.Meta.name,
        value: Utils.Meta.documents.setForField(document, formData, component.full_path)
      }
    });
  };

  const onComponentChangeExtended = ({ target }) => {
    if (onComponentChange({ target })) {
      if (component.type === ComponentTypes.FILE) {
        changeMetaDocuments(target.value);
      }
    }
  };
  return Utils.Component.get({
    ...attrs,
    ...component,
    id: component.full_path || component.id,
    ...getComponentError(component, validation?.errors),
    label: Utils.interpolateString(component.label, formData),
    content: Utils.interpolateString(component.content, formData),
    hint: Utils.interpolateString(component.hint, formData),
    options,
    value: value || Utils.Component.defaultValue(component),
    onChange: onComponentChangeExtended,
    formData: formData
  }, wrap, hooks.onGetComponent);
};

FormComponent.propTypes = {
  component: PropTypes.shape({
    fieldId: PropTypes.string,
    label: PropTypes.string,
    hint: PropTypes.string,
    data: PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      ),
      url: PropTypes.string
    })
  }).isRequired,
  value: PropTypes.any,
  formData: PropTypes.any,
  wrap: PropTypes.bool,
  onChange: PropTypes.func
};

FormComponent.defaultProps = {
  wrap: true
};

export default FormComponent;
