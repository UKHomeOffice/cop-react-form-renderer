const TYPE_NAVIGATE = 'navigate';
const TYPE_SAVE_AND_CONTINUE = 'saveAndContinue';
const TYPE_SAVE_AND_NAVIGATE = 'saveAndNavigate';
const TYPE_SAVE_AND_RETURN = 'saveAndReturn';
const TYPE_SUBMIT = 'submit';
const TYPE_PRE_SUBMIT = 'preSubmit';

export const PageActionTypes = {
  NAVIGATE: TYPE_NAVIGATE,
  SAVE_AND_CONTINUE: TYPE_SAVE_AND_CONTINUE,
  SAVE_AND_NAVIGATE: TYPE_SAVE_AND_NAVIGATE,
  SAVE_AND_RETURN: TYPE_SAVE_AND_RETURN,
  SUBMIT: TYPE_SUBMIT,
  PRE_SUBMIT: TYPE_PRE_SUBMIT
};

export const DefaultPageActions = {
  [TYPE_NAVIGATE]: undefined, // No default for this.
  [TYPE_SAVE_AND_CONTINUE]: { type: TYPE_SAVE_AND_CONTINUE, validate: true, label: 'Save and continue' },
  [TYPE_SAVE_AND_NAVIGATE]: { type: TYPE_SAVE_AND_NAVIGATE, validate: true, label: 'Save and continue' },
  [TYPE_SAVE_AND_RETURN]: { type: TYPE_SAVE_AND_RETURN, validate: false, label: 'Save and return later', classModifiers: 'secondary' },
  [TYPE_SUBMIT]: { type: TYPE_SUBMIT, validate: true },
  [TYPE_PRE_SUBMIT]: {type: TYPE_PRE_SUBMIT, validate: false}
};

const PageAction = {
  TYPES: PageActionTypes,
  DEFAULTS: DefaultPageActions
};

export default PageAction;
