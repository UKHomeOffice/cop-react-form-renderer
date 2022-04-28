//Global Imports
import PropTypes from 'prop-types';
import React from 'react';
import { Tag, Utils } from '@ukhomeoffice/cop-react-components';

//Local imports
import { TaskStates } from '../../models';

export const DEFAULT_CLASS = 'hods-task-list';

const TaskState = ({ state }) => {
  const classes = Utils.classBuilder(DEFAULT_CLASS, undefined, undefined);
  
  if(!TaskStates.DETAILS[state]){
    return null;
  }

  return (
    <Tag classModifiers={[TaskStates.DETAILS[state].colour]} className={classes('tag')}>
      {TaskStates.DETAILS[state].label}
    </Tag>
  );
};

TaskState.propTypes = {
  state: PropTypes.string.isRequired,
};

export default TaskState;
