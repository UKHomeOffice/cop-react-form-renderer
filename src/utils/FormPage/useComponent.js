const useComponent = (toUse, formComponents) => {
  const formComponent = formComponents.find(fc => fc.id === toUse.use);
  if (formComponent) {
    const fieldId = toUse.fieldId || formComponent.fieldId;
    return {
      ...formComponent,
      ...toUse,
      cya_label: formComponent.label,
      fieldId
    };
  }
  return { ...toUse };
};

export default useComponent;