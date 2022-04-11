//Global Imports
import PropTypes from 'prop-types';
import React from 'react';
import { Tag } from '@ukhomeoffice/cop-react-components';

//Local imports
import { TaskStates } from '../../models';

const TaskState = ({ state }) => {
  return (
    <Tag classModifiers={[TaskStates.DETAILS[state].colour]} style={{ float: 'right' }}>
      {TaskStates.DETAILS[state].label}
    </Tag>
  );
};

TaskState.propTypes = {
  state: PropTypes.string,
};

export default TaskState;
