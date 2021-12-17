// Global imports
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// Local imports
import useRefData, { STATUS_COMPLETE } from '../../hooks/useRefData';
import Utils from '../../utils';

const FormComponent = ({
  component,
  value,
  noWrap,
  onChange,
  ...attrs
}) => {
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
    value,
    onChange
  }, noWrap);
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
  value: PropTypes.any.isRequired,
  noWrap: PropTypes.bool,
  onChange: PropTypes.func
};

FormComponent.defaultProps = {
  noWrap: false
};

export default FormComponent;
