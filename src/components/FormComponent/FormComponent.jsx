// Global imports
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// Local imports
import useHooks from '../../hooks/useHooks';
import useRefData, { STATUS_COMPLETE } from '../../hooks/useRefData';
import Utils from '../../utils';

const FormComponent = ({
  component,
  value,
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
    label: PropTypes.string,
    hint: PropTypes.string,
    data: PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.object),
      url: PropTypes.string
    })
  }).isRequired,
  value: PropTypes.any,
  wrap: PropTypes.bool,
  onChange: PropTypes.func
};

FormComponent.defaultProps = {
  wrap: true
};

export default FormComponent;
