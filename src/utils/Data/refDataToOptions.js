/**
 * Converts ref data items to options.
 * @param {Array} refDataItems An array of ref data items.
 * @returns An array of options.
 */
const refDataToOptions = (refDataItems) => {
  if (Array.isArray(refDataItems)) {
    return refDataItems.map((opt) => {
      if (typeof opt === 'string') {
        return opt;
      }
      return {
        ...opt,
        value: opt.id || opt.value,
        label: opt.name || opt.label,
      };
    });
  }
  return [];
};

export default refDataToOptions;
