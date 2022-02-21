const getRowActionAttributes = (row) => {
  if (row && row.action) {
    if (typeof(row.action.onAction) === 'function') {
      return { onClick: () => row.action.onAction(row) };
    } else if (row.action.page) {
      return { href: `/${row.action.page}`};
    }
  }
  return {};
};

export default getRowActionAttributes;
