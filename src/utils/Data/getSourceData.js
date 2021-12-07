const getSourceData = (data, fieldId) => {
  if (!fieldId) {
    return undefined;
  }
  return fieldId.split('.').reduce((obj, prop) => {
    return obj ? obj[prop] : undefined;
  }, data);
};

export default getSourceData;
