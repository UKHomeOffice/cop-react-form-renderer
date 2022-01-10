const TYPE_SUBMIT = 'submit';
const TYPE_SAVE_AND_CONTINUE = 'saveAndContinue';
const TYPE_SAVE_AND_RETURN = 'saveAndReturn';

export const PageActionTypes = {
  SUBMIT: TYPE_SUBMIT,
  SAVE_AND_CONTINUE: TYPE_SAVE_AND_CONTINUE,
  SAVE_AND_RETURN: TYPE_SAVE_AND_RETURN
};

export const DefaultPageActions = {
  [TYPE_SUBMIT]: { type: TYPE_SUBMIT, validate: true },
  [TYPE_SAVE_AND_CONTINUE]: { type: TYPE_SAVE_AND_CONTINUE, validate: true, label: 'Save and continue' },
  [TYPE_SAVE_AND_RETURN]: { type: TYPE_SAVE_AND_RETURN, validate: false, label: 'Save and return later', classModifiers: 'secondary' }
};

const PageAction = {
  TYPES: PageActionTypes,
  DEFAULTS: DefaultPageActions
};

export default PageAction;
