//Global Imports
import PropTypes from 'prop-types';
import React from 'react';
import { Tag } from '@ukhomeoffice/cop-react-components';

const TaskState = ({ state }) => {
  const STATE_OPTIONS = {
    complete: { label: 'Completed', colour: '' },
    inProgress: { label: 'In Progress', colour: 'blue' },
    notStarted: { label: 'Not Started', colour: 'grey' },
    cannotStartYet: { label: 'Cannot Start Yet', colour: 'grey' },
  };
  return (
    <Tag classModifiers={[STATE_OPTIONS[state].colour]} style={{ float: 'right' }}>
      {STATE_OPTIONS[state].label}
    </Tag>
  );
};

TaskState.propTypes = {
  state: PropTypes.string,
};

export default TaskState;
