const getComponentError = (component, errors) => {
  if (Array.isArray(errors)) {
    const error = errors.find(err => err.id === (component.full_path || component.id));
    if (error) {
      const props = { error: error.error };
      if (error.properties) {
        props.propsInError = error.properties;
      }
      return props;
    }
  }
  return undefined;
};

export default getComponentError;
