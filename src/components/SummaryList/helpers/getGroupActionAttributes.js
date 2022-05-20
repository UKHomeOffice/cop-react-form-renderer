const getGroupActionAttributes = (groupRow) => {
  if (groupRow && Object.prototype.hasOwnProperty.call(groupRow, 'action')) {
    if (typeof(groupRow.action.onAction) === 'function') {
      return { onClick: () => groupRow.action.onAction(groupRow) };
    } else if (groupRow.action.page) {
      return { href: `/${groupRow.action.page}`};
    }
  }
  return {};
};

export default getGroupActionAttributes;
