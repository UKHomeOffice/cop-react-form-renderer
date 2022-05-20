import FormComponent from '../../components/FormComponent';
import getCYAAction from './getCYAAction';

const getRowValue = (row) => {
  if (!row.value) {
    return null;
  }
  if (!row.component) {
    return row.value;
  }
  return (
    <div key={row.id}>
      <FormComponent
        component={{ ...row.component, readonly: true }}
        wrap={false}
        value={row.value}
      />
    </div>
  );
};

const getGroupValue = (group, rows) => {
  let firstComponentIndex = -1;
  const value = (
    <>
      {group.components.map(componentId => {
        const rowIndex = rows.findIndex(r => r.id === componentId);
        if (firstComponentIndex < 0) {
          firstComponentIndex = rowIndex;
        }
        return rowIndex > -1 ? getRowValue(rows[rowIndex]) : null;
      })}
    </>
  );
  return { value, firstComponentIndex };
};

const getCYARowForGroup = (page, group, rows, onAction) => {
  const { value, firstComponentIndex } = getGroupValue(group, rows);
  const row = {
    pageId: page.id,
    fieldId: group.id,
    key: group.label,
    value,
    action: getCYAAction(false, page, onAction)
  };

  return { row, insertAt: firstComponentIndex }
};

export default getCYARowForGroup;
