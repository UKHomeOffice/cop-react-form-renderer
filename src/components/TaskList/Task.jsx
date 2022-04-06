//Global Imports
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link, Utils } from '@ukhomeoffice/cop-react-components';

//Local imports
import TaskState from './TaskState';

export const DEFAULT_CLASS = 'app-task-list';

const Task = ({ taskName, state, onClick }) => {
  const classes = Utils.classBuilder(DEFAULT_CLASS, undefined, undefined);

  const [linkActive, setLinkActive] = useState(state !== 'cannotStartYet');
  const [currentState, setCurrentState] = useState(state);

  useEffect(() => {
    setLinkActive(state !== 'cannotStartYet');
    setCurrentState(state);
  }, [state]);

  return (
    <li className={classes('item')}>
      <span className={classes('task-name')}>{linkActive ? <Link onClick={() => onClick(taskName)}>{taskName}</Link> : taskName}</span>
      <TaskState state={currentState} />
    </li>
  );
};

TaskState.propTypes = {
  taskName: PropTypes.string,
  state: PropTypes.string,
};

export default Task;
