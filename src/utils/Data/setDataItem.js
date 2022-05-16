const setDataItem = (data, fieldId, value) => {
  if (fieldId && data) {
    const parts = fieldId.split('.');
    const leaf = parts.pop();
    let node = data;
    parts.forEach(part => {
      if (!node[part] || typeof(node[part]) !== 'object') {
        node[part] = {};
      }
      node = node[part];
    });
    node[leaf] = value;
  }
  return data;
};

export default setDataItem;
