//Global Imports
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link, Utils } from '@ukhomeoffice/cop-react-components';

//Local imports
import TaskState from './TaskState';

export const DEFAULT_CLASS = 'hods-task-list';

const Task = ({ task, onClick }) => {
  const classes = Utils.classBuilder(DEFAULT_CLASS, undefined, undefined);

  const [linkActive, setLinkActive] = useState(task.state !== 'cannotStartYet');
  const [currentState, setCurrentState] = useState(task.state);

  useEffect(() => {
    setLinkActive(task.state !== 'cannotStartYet');
    setCurrentState(task.state);
  }, [task]);

  return (
    <li className={classes('item')}>
      <span className={classes('task-name')}>
        {linkActive ? <Link onClick={() => onClick(task.firstPage)}>{task.name}</Link> : task.name}
      </span>
      <TaskState state={currentState} />
    </li>
  );
};

TaskState.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string,
    firstPage: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export default Task;
