// Local imports
import mustBeAfter from './mustBeAfter';
import mustBeBefore from './mustBeBefore';
import mustBeInThePast from './mustBeInThePast';
import mustBeInTheFuture from './mustBeInTheFuture';
import mustBeLongerThan from './mustBeLongerThan';
import mustBeShorterThan from './mustBeShorterThan';

const functions = { 
  mustBeAfter, mustBeBefore, 
  mustBeInThePast, mustBeInTheFuture, 
  mustBeLongerThan, mustBeShorterThan 
};

const additionalValidation = (value, config) => {
  const fn = functions[config.function];
  if (typeof fn === 'function') {
    return fn(value, config) ? undefined : config.message;
  }
  return undefined;
};

const runAdditionalComponentValidation = (component, value) => {
  // We only care when we have a value - if we don't have one but want one, set `required: true`.
  if (!!value) {
    if (Array.isArray(component.additionalValidation)) {
      let error = undefined;
      component.additionalValidation.forEach((config) => {
        // If we've already encountered an error, don't run any more validators.
        if (!error) {
          error = additionalValidation(value, config);
        }
      });
      return error;
    }
  }
  return undefined;
};

export default runAdditionalComponentValidation;
