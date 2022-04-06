// Global imports
import { LargeHeading } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Local imports
import { useHooks } from '../../hooks';
import { EventTypes, FormPages, FormTypes, PageAction } from '../../models';
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
  className,
  hide_title,
  summaryListClassModifiers,
  noChangeAction,
}) => {
  // Set up the initial states.
  const [data, setData] = useState({});
  const [pages, setPages] = useState([]);
  const [hub, setHub] = useState(undefined);
  const [pageId, setPageId] = useState(helpers.getNextPageId(type, _pages));
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
    if (components && _pages && _data) {
      setData(Utils.Data.setupForm(_pages, components, _data));
      if (_data.formStatus?.page) {
        setPageId(_data.formStatus.page);
      }
    }
  }, [components, _pages, _data, setData]);

  // Setup pages.
  useEffect(() => {
    setPages(Utils.FormPage.getAll(_pages, components, { ...data }));
  }, [components, _pages, data, setPages]);

  // Setup initial pageId.
  useEffect(() => {
    setPageId(prev => {
      return prev || helpers.getNextPageId(type, pages);
    });
  }, [type, pages, setPageId]);

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
  const onPageAction = (action, patch, onError) => {
    // Check to see whether the action is able to proceed, which in
    // in the case of a submission will validate the fields in the page.
    if (helpers.canActionProceed(action, formState.page, onError)) {
      if (action.type === PageAction.TYPES.NAVIGATE) {
        handlers.navigate(action, pageId, onPageChange);
      } else {
        // Save draft or submit.
        const submissionData = Utils.Format.form({ pages, components }, { ...data, ...patch }, EventTypes.SUBMIT);
        submissionData.formStatus = helpers.getSubmissionStatus(type, pages, pageId, action, submissionData);
        if (patch) {
          setData(submissionData);
        }
        // Now submit the data to the backend...
        hooks.onSubmit(action.type, submissionData, (response) => {
          // The backend response may well contain data we need so apply it.
          setData(prev => {
            const next = { ...prev, ...response };
            onPageChange(helpers.getNextPageId(type, pages, pageId, action, next));
            return next;
          });
        }, (errors) => {
          handlers.submissionError(errors, onError);
        });
      }
    }
  };

  // Handle navigation from "Check your answers".
  const onCYARowAction = (page) => {
    handlers.cyaAction(page, pageId, onPageChange);
  };

  // Handle actions from "Check your answers".
  const onCYAAction = (action, onError) => {
    // Check to see whether the action is able to proceed, which in
    // in the case of a submission will validate the fields in the page.
    if (action.type === PageAction.TYPES.SUBMIT) {
      if (helpers.canCYASubmit(pages, onError)) {
        // Submit.
        const submissionData = Utils.Format.form({ pages, components }, { ...data }, EventTypes.SUBMIT);
        submissionData.formStatus = helpers.getSubmissionStatus(type, pages, pageId, action);
        setData(submissionData);
        // Now submit the data to the backend...
        hooks.onSubmit(action.type, submissionData,
          () => hooks.onFormComplete(),
          (errors) => handlers.submissionError(errors, onError)
        );
      }
    }
  };

  const classes = Utils.classBuilder(classBlock, classModifiers, className);
  return (
    <div className={classes()}>
      {title && !hide_title && pageId === FormPages.HUB && <LargeHeading>{title}</LargeHeading>}
      {
        formState.cya &&
        <CheckYourAnswers
          pages={pages}
          {...cya}
          {...formState.cya}
          onAction={onCYAAction}
          onRowAction={onCYARowAction}
          summaryListClassModifiers={summaryListClassModifiers}
          hide_title={hide_title}
          noChangeAction={noChangeAction}
        />
      }
      {formState.page && <FormPage page={formState.page} onAction={onPageAction} />}
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
  className: PropTypes.string,
  hide_title: PropTypes.bool,
  summaryListClassModifiers: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  noChangeAction: PropTypes.bool,
};

FormRenderer.defaultProps = {
  type: FormTypes.HUB,
  components: [],
  pages: [],
  classBlock: DEFAULT_CLASS,
  classModifiers: [],
  hide_title: false,
  summaryListClassModifiers: [],
  noChangeAction: false,
};

export default FormRenderer;
