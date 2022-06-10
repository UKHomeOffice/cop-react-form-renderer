const parentComponents = ['radios'];

const cleanHiddenNestedData = (patch, page) => {
  page.components.forEach((component) => {
    if (!parentComponents.includes(component.type)) {
      return;
    }
    const idsToDelete = getIdsToDelete(component, patch[component.id]);
    idsToDelete.forEach((id) => {
      delete patch[id];
    });
  });
  return patch;
};

function getIdsToDelete(component, selectedValue) {
    const idsToDelete = [];
    component?.data?.options?.forEach((option) => {
        if (option.value !== selectedValue && option.nested) {
            option.nested.forEach((nested) => {
                idsToDelete.push(nested.id);
            });
        }
    });
    return idsToDelete;
}

export default cleanHiddenNestedData;
