// Global imports
import { LargeHeading } from '@ukhomeoffice/cop-react-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Local imports
import { HooksContextProvider, ValidationContextProvider } from '../../context';
import { useHooks, useValidation } from '../../hooks';
import { EventTypes, FormPages, FormTypes, HubFormats, PageAction, TaskStates } from '../../models';
import Utils from '../../utils';
import CheckYourAnswers from '../CheckYourAnswers';
import FormPage from '../FormPage';
import TaskList from '../TaskList';
import handlers from './handlers';
import helpers from './helpers';

// Styles
import './FormRenderer.scss';

const FormRenderer = ({
  title,
  type,
  components,
  pages,
  hub,
  cya,
  data,
  hooks,
  classBlock,
  classModifiers,
  className,
  hide_title,
  summaryListClassModifiers,
  noChangeAction,
}) => {
  return (
    <HooksContextProvider overrides={hooks}>
      <ValidationContextProvider>
        <InternalFormRenderer
          title={title}
          type={type}
          components={components}
          pages={pages}
          hub={hub}
          cya={cya}
          data={data}
          classBlock={classBlock}
          classModifiers={classModifiers}
          className={className}
          hide_title={hide_title}
          summaryListClassModifiers={summaryListClassModifiers}
          noChangeAction={noChangeAction}
        />
      </ValidationContextProvider>
    </HooksContextProvider>
  );
};

export const DEFAULT_CLASS = 'hods-form';
const InternalFormRenderer = ({
  title,
  type,
  components,
  pages: _pages,
  hub: _hub,
  cya,
  data: _data,
  classBlock,
  classModifiers,
  className,
  hide_title,
  summaryListClassModifiers,
  noChangeAction,
}) => {
  // Set up the initial states.
  const [data, setData] = useState({});
  const [submitted, setSubmitted] = useState();
  const [pages, setPages] = useState([]);
  const [hub, setHub] = useState(undefined);
  const [pageId, setPageId] = useState(helpers.getNextPageId(type, _pages));
  const [formState, setFormState] = useState(helpers.getFormState(pageId, pages, hub));
  const [currentTask, setCurrentTask] = useState({});
  const [hubDetails, setHubDetails] = useState({});

  // Set up hooks.
  const { hooks } = useHooks();

  // Set up the useValidation hook.
  const { addErrors, clearErrors, validate } = useValidation();

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

  useEffect(() => {
    setHubDetails(_hub);
  }, [_hub])

  // Calling setData directly within the hooks.onSubmit success handler
  // resulted in a sychronisation error. Handling it in a useEffect appears
  // to be the way to deal with this... and it certainly seems to work.
  useEffect(() => {
    if (submitted?.data) {
      setData(submitted.data);
      setSubmitted(undefined);
    }
  }, [submitted, setData, setSubmitted]);

  // Update task list pages with form data and update states
  useEffect(() => {
    const pages = currentTask.fullPages;
    if (pages) {
      pages.forEach(page => {
        page.formData = data;
      });
      setCurrentTask(prev => ({ ...prev, fullPages: pages }));
    }

    if (hubDetails?.sections) {
      const tasks = data?.formStatus?.tasks ? data.formStatus.tasks : {};
      const updatedSections = helpers.getUpdatedSectionStates(hubDetails.sections, tasks);
      setHubDetails(prev => ({ ...prev, ...updatedSections }));
    }
  }, [currentTask.fullPages, data, hubDetails?.sections]);

  const onPageChange = (newPageId) => {
    clearErrors();
    setPageId(newPageId);
    hooks.onPageChange(newPageId);
  };

  // Handle actions from pages.
  const onPageAction = (action, patch) => {
    // Check to see whether the action is able to proceed, which in
    // in the case of a submission will validate the fields in the page.
    if (helpers.canActionProceed(action, formState.page, validate.page)) {
      patch = helpers.cleanHiddenNestedData(patch, formState.page);
      if (action.type === PageAction.TYPES.NAVIGATE) {
        handlers.navigate(action, pageId, onPageChange);
      } else {
        // Save draft or submit.
        const submissionData = Utils.Format.form({ pages, components }, { ...data, ...patch }, EventTypes.SUBMIT);
        submissionData.formStatus = helpers.getSubmissionStatus(type, pages, pageId, action, submissionData, currentTask, true);
        if (patch) {
          setData(submissionData);
        }

        let pageUpdate = (next) => onPageChange(helpers.getNextPageId(type, pages, pageId, action, next));
        // const navigablePages = currentTask?.fullPages || pages;
        // let pageUpdate = (next) => onPageChange(helpers.getNextPageId(type, navigablePages, pageId, action, next));
        if (action.type === PageAction.TYPES.SAVE_AND_NAVIGATE) {
          pageUpdate = () => handlers.navigate(action, pageId, onPageChange);
        }

        // Now submit the data to the backend...
        hooks.onSubmit(action.type, submissionData, (response) => {
          // The backend response may well contain data we need so apply it...
          // ... but this needs to happen in a useEffect, not right away.
          const sData = { ...submissionData, ...response };
          setSubmitted({ data: sData });
          pageUpdate(sData);
        }, (errors) => {
          handlers.submissionError(errors, addErrors);
        });
      }
    }
  };

  // Handle navigation from "Check your answers".
  const onCYARowAction = (page) => {
    handlers.cyaAction(page, pageId, onPageChange);
  };

  //Kick off a task, gather required pages and move to the correct point
  const onTaskAction = (currentTask) => {
    if (currentTask) {
      currentTask.fullPages = [];
      currentTask.pages.forEach((page) => {
        currentTask.fullPages.push(helpers.getPage(page, pages));
      });
      setCurrentTask(currentTask);
      if (currentTask.state === TaskStates.TYPES.COMPLETE) {
        onPageChange(FormPages.CYA);
      }
      else if (currentTask.state === TaskStates.TYPES.IN_PROGRESS) {
        const currentPage = data.formStatus.tasks[currentTask.name].currentPage;
        onPageChange(currentPage || currentTask.pages[0]);
      }
      else {
        onPageChange(currentTask.pages[0]);
      }
    }
  };

  // Handle actions from "Check your answers".
  const onCYAAction = (action) => {
    // Check to see whether the action is able to proceed, which in
    // in the case of a submission will validate the fields in the page.
    if (action.type === PageAction.TYPES.SUBMIT) {
      if (helpers.canCYASubmit(pages, validate.pages)) {
        // Submit.
        const submissionData = Utils.Format.form({ pages, components }, { ...data }, EventTypes.SUBMIT);
        submissionData.formStatus = helpers.getSubmissionStatus(type, pages, pageId, action, submissionData, currentTask, true);
        setData(submissionData);
        // Now submit the data to the backend...
        hooks.onSubmit(action.type, submissionData,
          () => hooks.onFormComplete(),
          (errors) => handlers.submissionError(errors, addErrors)
        );
      }
    }
    if (action.type === PageAction.TYPES.SAVE_AND_CONTINUE && hub === HubFormats.TASK) {
      if (helpers.canCYASubmit(currentTask.fullPages, validate.pages)) {
        const submissionData = Utils.Format.form({ pages, components }, { ...data }, EventTypes.SUBMIT);
        submissionData.formStatus = helpers.getSubmissionStatus(type, pages, pageId, action, submissionData, currentTask, true);
        setData(submissionData);
        hooks.onSubmit(action.type, submissionData,
          () => onPageChange(FormPages.HUB),
          (errors) => handlers.submissionError(errors, addErrors)
        );
      }
    }
    if (action.type === PageAction.TYPES.SAVE_AND_RETURN) {
      if (helpers.canCYASubmit(currentTask.fullPages, validate.pages)) {
        const submissionData = Utils.Format.form({ pages, components }, { ...data }, EventTypes.SUBMIT);
        submissionData.formStatus = helpers.getSubmissionStatus(type, pages, pageId, action, submissionData, currentTask);
        setData(submissionData);
        hooks.onSubmit(action.type, submissionData,
          () => {
            if (type === FormTypes.TASK) {
              onPageChange(undefined)
            }
            else {
              onPageChange(FormPages.HUB)
            }
          },
          (errors) => handlers.submissionError(errors, addErrors)
        );
      }
    }

  };

  const classes = Utils.classBuilder(classBlock, classModifiers, className);

  if (hub === HubFormats.TASK) {
    cya.actions = [
      PageAction.TYPES.SAVE_AND_CONTINUE,
      PageAction.TYPES.SAVE_AND_RETURN,
    ];
  }

  return (
    <div className={classes()}>
      {title && !hide_title && pageId === FormPages.HUB && <LargeHeading>{title}</LargeHeading>}
      {
        formState.cya &&
        <CheckYourAnswers
          pages={currentTask.fullPages ? currentTask.fullPages : pages}
          {...cya}
          {...formState.cya}
          onAction={onCYAAction}
          onRowAction={onCYARowAction}
          summaryListClassModifiers={summaryListClassModifiers}
          hide_title={hide_title}
          noChangeAction={noChangeAction}
        />
      }
      {hub === HubFormats.TASK && formState.pageId === FormPages.HUB && (
        <TaskList
          sections={hubDetails.sections}
          refNumber={data['businessKey']}
          refTitle={_hub.refTitle}
          onTaskAction={onTaskAction}
        />
      )}
      {formState.page && <FormPage page={formState.page} onAction={onPageAction} />}
    </div>
  );
};

FormRenderer.propTypes = InternalFormRenderer.propTypes = {
  title: PropTypes.string,
  /** See <a href="/?path=/docs/f-json--page#formtypes">FormTypes</a>. */
  type: PropTypes.oneOf([FormTypes.CYA, FormTypes.FORM, FormTypes.HUB, FormTypes.TASK, FormTypes.WIZARD]).isRequired,
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
  hub: PropTypes.object,
  cya: PropTypes.object,
  data: PropTypes.object,
  hooks: PropTypes.object,
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

FormRenderer.defaultProps = InternalFormRenderer.defaultProps = {
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
