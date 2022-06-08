// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import { ComponentTypes } from '../../models';
import Utils from '../../utils';
import FormComponent from './FormComponent';

export const DEFAULT_CLASS = 'hods-form-container';
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
      if (target.name === Utils.Meta.name) {
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
    <div {...attrs} className={DEFAULT_CLASS} id={container.id}>
      {container.components && container.components.filter(shouldShow).map((component, index) => {
        const defaultValue = component.type === ComponentTypes.FILE ? {} : '';
        const val = value ? value[component.fieldId] : defaultValue;
        return <FormComponent
          key={index}
          {...attrs}
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

export default Container;
