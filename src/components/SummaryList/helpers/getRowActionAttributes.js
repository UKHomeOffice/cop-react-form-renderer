const getRowActionAttributes = (row) => {
  if (row && row.action) {
    if (typeof(row.action.onAction) === 'function') {
      return { onClick: () => row.action.onAction(row) };
    } else {
      return { href: row.action.href };
    }
  }
  return {};
};

export default getRowActionAttributes;
