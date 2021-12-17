const getCYAAction = (readonly, cya_link, onAction) => {
  if (readonly !== true && cya_link) {
    return {
      href: cya_link.url || '#',
      label: cya_link.label || 'Change',
      aria_suffix: cya_link.aria_suffix,
      onAction
    };
  }
  return null;
};

export default getCYAAction;
