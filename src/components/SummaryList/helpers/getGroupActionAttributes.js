const getGroupActionAttributes = (groupRow) => {
  console.log(groupRow.action.onAction);
  if (groupRow && groupRow.action.onAction) {
    if (typeof(groupRow.action.onAction) === 'function') {
      return { onClick: () => groupRow.action.onAction(groupRow) };
    } else if (groupRow.action.page) {
      return { href: `/${groupRow.action.page}`};
    }
  }
  return {};
};

export default getGroupActionAttributes;
