// Global imports
import { Button, ButtonGroup, Label } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Local imports
import { CollectionLabels } from '../../models';
import Utils from '../../utils';
import Container from './Container';

// Styles
import './Collection.scss';

export const DEFAULT_CLASS = 'hods-form-collection';
const Collection = ({
  config,
  value: _value,
  formData,
  onChange,
  wrap
}) => {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(_value || []);
  }, [_value, setValue]);

  const reportChange = (newValue) => {
    setValue(newValue);
    if (typeof onChange === 'function') {
      onChange({
        target: { name: config.fieldId, value: newValue }
      });
    }
  };
  const onCollectionChange = ({ target }) => {
    if (typeof onChange === 'function') {
      if (target.name === Utils.Meta.name) {
        onChange({ target });
      } else {
        const itemIndex = value.findIndex(item => item.id === target.name);
        reportChange([
          ...value.slice(0, itemIndex),
          target.value,
          ...value.slice(itemIndex + 1)
        ]);
      }
    }
  };

  const onAddAnother = async () => {
    reportChange([...value, { id: Date.now().toString() }]);
  };

  const onRemoveItem = async (item) => {
    reportChange(value.filter(i => i.id !== item.id));
  };
  const labels = {
    ...CollectionLabels,
    ...config.labels
  };
  const classes = Utils.classBuilder(DEFAULT_CLASS, [], config.className);
  return (
    <div className={classes()} id={config.id}>
      {config.label && (
        <Label id={config.id} required={config.required} className={classes('title')}>
          {config.label}
        </Label>
      )}
      {value && value.map((item, index) => {
        const full_path = `${config.full_path || config.fieldId}[${index}]`;
        const labelCount = (config.countOffset || 0) + index + 1;
        const itemTitle = Utils.interpolateString(labels.item, { ...item, index: labelCount });
        const removeLabel = Utils.interpolateString(labels.remove, { ...item, index: labelCount });
        return (
          <div className={`${classes('item')}`} key={item.id}>
            <Label id={item.id} required className={classes('item-title')}>
              {itemTitle}
              {!config.disableAddAndRemove && (
                <Button onClick={() => onRemoveItem(item)} classModifiers="secondary">{removeLabel}</Button>
              )}
            </Label>
            <Container
              container={{
                id: item.id,
                fieldId: item.id,
                type: 'container',
                required: config.required,
                full_path,
                components: config.item.map(component => {
                  return {
                    ...component,
                    label: Utils.interpolateString(component.label, { ...item, index: labelCount }),
                    full_path: `${full_path}.${component.fieldId}`
                  };
                })
              }}
              value={item}
              formData={formData}
              onChange={onCollectionChange}
              wrap={wrap}
            />
          </div>
        );
      })}
      {!config.disableAddAndRemove && (
        <ButtonGroup>
          <Button onClick={onAddAnother} classModifiers="secondary">{labels.add}</Button>
        </ButtonGroup>
      )}
    </div>
  );
};

Collection.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fieldId: PropTypes.string.isRequired,
    label: PropTypes.string,
    labels: PropTypes.shape({
      item: PropTypes.string,
      add: PropTypes.string,
      remove: PropTypes.string
    }),
    disableAddAndRemove: PropTypes.bool,
    countOffset: PropTypes.number,
    className: PropTypes.string,
    item: PropTypes.arrayOf(PropTypes.shape({
      fieldId: PropTypes.string,
      type: PropTypes.string
    }))
  }).isRequired,
  value: PropTypes.arrayOf(PropTypes.shape()),
  formData: PropTypes.any,
  wrap: PropTypes.bool,
  onChange: PropTypes.func
};

Collection.defaultProps = {
  value: []
};

export default Collection;
