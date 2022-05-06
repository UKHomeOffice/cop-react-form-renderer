// Global imports
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Local imports
import { STATUS_COMPLETE, useHooks, useRefData } from '../../hooks';
import { ComponentTypes } from '../../models';
import Utils from '../../utils';

export const DEFAULT_CONTAINER_CLASS = 'hods-form-container';
const Container = ({
  container,
  value,
  formData,
  onChange,
  wrap,
  ...attrs
}) => {
  const onComponentChange = ({ target }) => {
    const val = { ...value, [target.name]: target.value };
    if (typeof onChange === 'function') {
      onChange({
        target: {
          name: container.fieldId,
          value: val
        }
      });
    }
  };

  const shouldShow = (options) => {
    if (options.type === ComponentTypes.CONTAINER) {
      return Utils.Container.show(options, formData);
    }
    return Utils.Component.show(options, formData);
  };

  return (
    <div {...attrs} className={DEFAULT_CONTAINER_CLASS} id={container.id}>
      {container.components && container.components.filter(shouldShow).map((component, index) => {
        const val = value ? value[component.fieldId] : '';
        return <FormComponent
          key={index}
          component={component}
          formData={formData}
          value={val || ''}
          wrap={wrap}
          onChange={onComponentChange}
        />
      })}
    </div>
  );
};

Container.propTypes = {
  container: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fieldId: PropTypes.string.isRequired,
    components: PropTypes.arrayOf(PropTypes.shape({
      fieldId: PropTypes.string,
      type: PropTypes.string
    }))
  }).isRequired,
  value: PropTypes.any,
  formData: PropTypes.any,
  wrap: PropTypes.bool,
  onChange: PropTypes.func
};

Container.defaultProps = {
  wrap: true
};

const FormComponent = ({
  component,
  value,
  formData,
  wrap,
  onChange,
  ...attrs
}) => {
  const { hooks } = useHooks();
  const { data, status } = useRefData(component);
  const [ options, setOptions ] = useState([]);
  useEffect(() => {
    if (status === STATUS_COMPLETE) {
      setOptions(data);
    }
  }, [component, data, status]);

  if (component.type === ComponentTypes.CONTAINER) {
    return (
      <Container
        container={component}
        wrap={wrap}
        onChange={onChange}
        value={value}
        formData={formData}
      />
    );
  }

  return Utils.Component.get({
    ...attrs,
    ...component,
    label: component.label || '',
    hint: component.hint || '',
    options,
    value: value || '',
    onChange
  }, wrap, hooks.onGetComponent);
};

FormComponent.propTypes = {
  component: PropTypes.shape({
    fieldId: PropTypes.string,
    label: PropTypes.string,
    hint: PropTypes.string,
    data: PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.object),
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
