// Global imports
import { LargeHeading } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Local imports
import { useHooks } from '../../hooks';
import { EventTypes, FormTypes } from '../../models';
import Utils from '../../utils';
import CheckYourAnswers from '../CheckYourAnswers';
import FormPage from '../FormPage';
import handlers from './handlers';
import helpers from './helpers';

// Styles
import './FormRenderer.scss';

export const DEFAULT_CLASS = 'hods-form';
const FormRenderer = ({
  title,
  type,
  components,
  pages: _pages,
  hub: _hub,
  cya,
  data: _data,
  hooks: _hooks,
  classBlock,
  classModifiers,
  className
}) => {
  // Set up the initial states.
  const [data, setData] = useState({});
  const [pages, setPages] = useState([]);
  const [hub, setHub] = useState(undefined);
  const [pageId, setPageId] = useState('hub');
  const [formState, setFormState] = useState(helpers.getFormState(pageId, pages, hub));
  
  // Set up hooks.
  const { hooks, addHook } = useHooks();
  useEffect(() => {
    if (_hooks) {
      Object.keys(_hooks).forEach(key => {
        addHook(key, _hooks[key]);
      });
    }
  }, [_hooks, addHook]);

  // Setup data.
  useEffect(() => {
    setData(Utils.Data.setupForm(_pages, components, _data));
  }, [components, _pages, _data, setData]);

  // Setup pages.
  useEffect(() => {
    setPages(Utils.FormPage.getAll(_pages, components, { ...data }));
  }, [components, _pages, data, setPages]);

  // Setup hub.
  useEffect(() => {
    setHub(Utils.Hub.get(type, _hub, components, { ...data }));
  }, [type, _hub, data, components, setHub]);

  // Form state.
  useEffect(() => {
    setFormState(helpers.getFormState(pageId, pages, hub));
  }, [pages, hub, pageId, setFormState]);

  // Call the onFormLoad hook just when this component first renders.
  useEffect(() => {
    hooks.onFormLoad();
  }, [hooks]);

  const onPageChange = (newPageId) => {
    setPageId(newPageId);
    hooks.onPageChange(newPageId);
  };

  // Handle actions from pages.
  const onAction = (action, patch, onError) => {
    // Check to see whether the action is able to proceed, which in
    // in the case of a submission will validate the fields in the page.
    if (helpers.canActionProceed(action, formState.page, onError)) {
      if (action.type === 'navigate') {
        handlers.navigate(action, pageId, onPageChange);
      } else {
        // Submit.
        const rawData = patch ? { ...data, ...patch } : { ...data };
        const submissionData = Utils.Format.form({ pages, components }, rawData, EventTypes.SUBMIT);
        if (patch) {
          setData(submissionData);
        }
        // Now submit the data to the backend...
        hooks.onSubmit(action.type, submissionData, () => {
          onPageChange('hub');
        }, (errors) => {
          handlers.submissionError(errors, onError);
        });
      }
    }
  };

  // Handle navigation from "Check your answers".
  const onCYAAction = (page) => {
    handlers.cyaAction(page, pageId, onPageChange);
  };

  const classes = Utils.classBuilder(classBlock, classModifiers, className);
  return (
    <div className={classes()}>
      {title && pageId === 'hub' && <LargeHeading>{title}</LargeHeading>}
      {formState.cya && <CheckYourAnswers pages={pages} {...cya} {...formState.cya} onAction={onCYAAction} />}
      {formState.page && <FormPage page={formState.page} onAction={onAction} />}
    </div>
  );
};

FormRenderer.propTypes = {
  title: PropTypes.string,
  /** See <a href="/?path=/docs/f-json--page#formtypes">FormTypes</a>. */
  type: PropTypes.oneOf([FormTypes.CYA, FormTypes.FORM, FormTypes.HUB, FormTypes.WIZARD]).isRequired,
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
  hub: PropTypes.object,
  cya: PropTypes.object,
  data: PropTypes.object,
  hooks: PropTypes.shape({
    onFormLoad: PropTypes.func,
    onPageChange: PropTypes.func,
    onRequest: PropTypes.func,
    onSubmit: PropTypes.func
  }),
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

FormRenderer.defaultProps = {
  type: FormTypes.HUB,
  components: [],
  pages: [],
  classBlock: DEFAULT_CLASS,
  classModifiers: []
};

export default FormRenderer;