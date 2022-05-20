// Global imports
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Local imports
import { STATUS_COMPLETE, useHooks, useRefData } from '../../hooks';
import { ComponentTypes } from '../../models';
import Utils from '../../utils';

export const META_PROPERTY = 'meta';
export const META_DOCUMENTS_PROPERTY = 'documents';
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
    if (typeof onChange === 'function') {
      if (target.name === META_PROPERTY) {
        onChange({ target });
      } else {
        const val = { ...value, [target.name]: target.value };
        onChange({
          target: { name: container.fieldId, value: val }
        });
      }
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
        const defaultValue = component.type === ComponentTypes.FILE ? {} : '';
        const val = value ? value[component.fieldId] : defaultValue;
        return <FormComponent
          key={index}
          component={component}
          formData={formData}
          value={val || defaultValue}
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

  const changeMetaDocuments = (document) => {
    const documents = (formData[META_PROPERTY]?.documents || []).filter(d => d.field !== component.full_path);
    if (document) {
      documents.push({ ...document, field: component.full_path });
    }
    onChange({
      target: {
        name: META_PROPERTY,
        value: { ...formData[META_PROPERTY], documents }
      }
    });
  };

  const onComponentChange = ({ target }) => {
    if (typeof onChange === 'function') {
      onChange({ target });
      if (component.type === ComponentTypes.FILE) {
        changeMetaDocuments(target.value);
      }
    }
  };

  if (component.type === ComponentTypes.CONTAINER) {
    return (
      <Container
        container={component}
        wrap={wrap}
        onChange={onComponentChange}
        value={value}
        formData={formData}
      />
    );
  }

  const defaultValue = component.type === ComponentTypes.FILE ? {} : '';
  return Utils.Component.get({
    ...attrs,
    ...component,
    label: component.label || '',
    hint: component.hint || '',
    options,
    value: value || defaultValue,
    onChange: onComponentChange
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
