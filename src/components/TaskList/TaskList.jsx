//Global Imports
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Utils } from '@ukhomeoffice/cop-react-components';

//Local Imports
import { TaskStates } from '../../models';
import Task from './Task';

import './TaskList.scss';

export const DEFAULT_CLASS = 'hods-task-list';

const TaskList = ({ refTitle, refNumber, sections, fieldId, onTaskAction, classBlock, classModifiers, className, ...attrs }) => {
  const classes = Utils.classBuilder(classBlock, classModifiers, className);

  //TODO state will be retrieved from a document in S3 rather than given in the component definition, covered under COP-9885
  const numberOfCompleteSections = sections.reduce((totalComplete, currentSection) => {
    return totalComplete + currentSection.tasks.filter((t) => t.state === TaskStates.TYPES.COMPLETE).length;
  }, 0);

  const numberOfSections = sections.reduce((totalSections, current) => {
    return totalSections + current.tasks.length;
  }, 0);

  const onClick = (firstPage) => {
    if (typeof onTaskAction === 'function') {
      onTaskAction(firstPage);
    }
  };

  return (
    <div {...attrs} className={classes()}>
      <h2 className='govuk-heading-s govuk-!-margin-bottom-2'>{`${refTitle} ${refNumber}`}</h2>
      {numberOfSections !== numberOfCompleteSections && (
        <h2 className='govuk-heading-s govuk-!-margin-bottom-2'>Incomplete form</h2>
      )}
      <p className='govuk-body govuk-!-margin-bottom-7'>{`You have completed ${numberOfCompleteSections} of ${numberOfSections} sections`}</p>
      {sections.map((section, index) => {
        return (
          <Fragment key={`${section.name}`}>
            <h2 className={classes('section')}>
              {sections.length > 1 ? `${index + 1}. ` : ''}
              {section.name}
            </h2>
            <ol className={classes('items')}>
              {section.tasks.map((task) => (
                <Task key={`${section.name}-${task.name}`} task={task} onClick={onClick} />
              ))}
            </ol>
          </Fragment>
        );
      })}
    </div>
  );
};

TaskList.propTypes = {
  refNumber: PropTypes.string,
  refTitle: PropTypes.string,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      tasks: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          firstPage: PropTypes.string.isRequired,
          state: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string,
};

TaskList.defaultProps = {
  classBlock: DEFAULT_CLASS,
};

export default TaskList;
