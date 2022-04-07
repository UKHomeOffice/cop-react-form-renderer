//Global Imports
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link, Utils } from '@ukhomeoffice/cop-react-components';

//Local imports
import TaskState from './TaskState';

export const DEFAULT_CLASS = 'hods-task-list';

const Task = ({ task, state, onClick }) => {
  const classes = Utils.classBuilder(DEFAULT_CLASS, undefined, undefined);

  const [linkActive, setLinkActive] = useState(state !== 'cannotStartYet');
  const [currentState, setCurrentState] = useState(state);

  useEffect(() => {
    setLinkActive(state !== 'cannotStartYet');
    setCurrentState(state);
  }, [state]);

  return (
    <li className={classes('item')}>
      <span className={classes('task-name')}>{linkActive ? <Link onClick={() => onClick(task.firstPage)}>{task.taskName}</Link> : task.taskName}</span>
      <TaskState state={currentState} />
    </li>
  );
};

TaskState.propTypes = {
  task: PropTypes.object,
  state: PropTypes.string,
  onClick: PropTypes.func,
};

export default Task;
