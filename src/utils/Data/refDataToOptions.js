const getValueAndLabel = (opt, itemStructure) => {
  let value = opt.value || opt.id;
  let label = opt.label || opt.name;
  if (itemStructure) {
    value = opt[itemStructure.value] || value;
    label = opt[itemStructure.label] || label;
  }
  return { value: value?.toString(), label };
};

/**
 * Converts ref data items to options.
 * @param {Array} refDataItems An array of ref data items.
 * @param {Object} itemStructure The structure of the item.
 * @returns An array of options.
 */
const refDataToOptions = (refDataItems, itemStructure) => {
  if (Array.isArray(refDataItems)) {
    return refDataItems.map((opt) => {
      if (typeof opt === 'string') {
        return opt;
      }
      return {
        ...opt,
        ...getValueAndLabel(opt, itemStructure)
      };
    });
  }
  return [];
};

export default refDataToOptions;
