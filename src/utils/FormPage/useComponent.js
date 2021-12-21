/**
 * Use an existing component from the formComponents, overriding any properties
 * where appropriate.
 * @param {object} toUse A configuration object that references the component to use and any overrides.
 * @param {Array} formComponents An array of existing components on the form.
 * @returns A component configuration object.
 */
const useComponent = (toUse, formComponents) => {
  const formComponent = toUse ? formComponents.find(fc => fc.id === toUse.use) : undefined;
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
