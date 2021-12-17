// Global imports
import { LargeHeading } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Local imports
import { useHooks } from '../../hooks';
import { FormTypes } from '../../models';
import Utils from '../../utils';
import CheckYourAnswers from '../CheckYourAnswers';
import FormPage from '../FormPage';
import { canActionProceed, getFormState } from './helpers';

// Styles
import './FormRenderer.scss';

const DEFAULT_CLASS = 'hods-form';
const FormRenderer = ({
  title,
  type,
  components,
  pages: _pages,
  hub: _hub,
  cya: _cya,
  data: _data,
  hooks,
  classBlock,
  classModifiers,
  className
}) => {
  // Set up the initial states.
  const [data, setData] = useState({});
  const [redoPages, setRedoPages] = useState(0);
  const [pages, setPages] = useState([]);
  const [hub, setHub] = useState(undefined);
  const [pageId, setPageId] = useState('hub');
  const [formState, setFormState] = useState(getFormState(pageId, pages, hub));
  
  // Set up hooks.
  const { addHook } = useHooks();
  useEffect(() => {
    if (hooks) {
      Object.keys(hooks).forEach(key => {
        addHook(key, hooks[key]);
      });
    }
  }, [hooks, addHook]);

  // Setup data.
  useEffect(() => {
    setData(Utils.Data.setupForm(_pages, components, _data));
  }, [components, _pages, _data, setData]);

  // Setup pages.
  useEffect(() => {
    setPages(Utils.FormPage.getAll(_pages, components, { ...data }));
  }, [components, _pages, data, redoPages, setPages]);

  // Setup hub.
  useEffect(() => {
    setHub(Utils.Hub.get(type, _hub, components));
  }, [type, _hub, components, setHub]);

  // Form state.
  useEffect(() => {
    setFormState(getFormState(pageId, pages, hub));
  }, [pages, hub, pageId, setFormState]);

  // Handle actions from pages.
  const onAction = (action, patch, onError) => {
    // First check the validity of the
    if (canActionProceed(action, formState.page, onError)) {
      if (action.type === 'navigate') {
        setPageId(action.url.replace('/', ''));
      } else if (action.type === 'cancel') {
        setRedoPages(Date.now);
        setPageId('hub');
      } else {
        // Submit.
        if (patch) {
          setData(prev => ({...prev, ...patch}));
        }
        // Now submit the data to the backend and, if that succeeds...
        setPageId('hub');
      }
    }
  };

  // Handle navigation from "Check your answers".
  const onCheckYourAnswerChange = (page) => {
    const action = page.action;
    if (action && action.href) {
      setPageId(action.href.replace('/', ''));
    } else {
      setPageId(page.pageId);
    }
  };

  const classes = Utils.classBuilder(classBlock, classModifiers, className);
  return (
    <div className={classes()}>
      {title && pageId === 'hub' && <LargeHeading>{title}</LargeHeading>}
      {formState.cya && <CheckYourAnswers pages={pages} {..._cya} {...formState.cya} onAction={onCheckYourAnswerChange} />}
      {formState.page && <FormPage page={formState.page} onAction={onAction} classes={classes} />}
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
    onRequest: PropTypes.func
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
