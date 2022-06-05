//Global Imports
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link, Utils } from '@ukhomeoffice/cop-react-components';

//Local imports
import { TaskStates } from '../../models';
import TaskState from './TaskState';

export const DEFAULT_CLASS = 'hods-task-list';

const Task = ({ task, onClick }) => {
  const classes = Utils.classBuilder(DEFAULT_CLASS, undefined, undefined);

  const [linkActive, setLinkActive] = useState(task.state !== TaskStates.TYPES.CANNOT_START_YET);
  const [currentState, setCurrentState] = useState(task.state);

  useEffect(() => {
    setLinkActive(task.state !== TaskStates.TYPES.CANNOT_START_YET);
    setCurrentState(task.state);
  }, [task.state, setLinkActive, setCurrentState]);

  return (
    <li className={classes('item')}>
      <span className={classes('task-name')}>
        {linkActive ? <Link onClick={() => onClick(task)} tabIndex="0">{task.name}</Link> : task.name}
      </span>
      <TaskState state={currentState} />
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
    pages: PropTypes.array.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Task;
