// Global imports
import { render } from '@testing-library/react';
import React from 'react';

// Local imports
import TaskState from './TaskState';
import { TaskStates } from '../../models'

describe('components', () => {
  describe('TaskList.TaskState', () => {
    it('should render a complete state icon', () => {
      const STATE = TaskStates.TYPES.COMPLETE;
      const { container } = render(<TaskState state={STATE} />);
      expect(container.childNodes.length).toEqual(1);
      expect(container.childNodes[0].classList).toContain('hods-tag');
      expect(container.childNodes[0].textContent).toEqual(TaskStates.DETAILS.complete.label);
    });

    it('should render an in progress state icon', () => {
      const STATE = TaskStates.TYPES.IN_PROGRESS;
      const { container } = render(<TaskState state={STATE} />);
      expect(container.childNodes.length).toEqual(1);
      expect(container.childNodes[0].classList).toContain('hods-tag');
      expect(container.childNodes[0].classList).toContain(`hods-tag--${TaskStates.DETAILS.inProgress.colour}`);
      expect(container.childNodes[0].textContent).toEqual(TaskStates.DETAILS.inProgress.label);
    });

    it('should render a not started state icon', () => {
      const STATE = TaskStates.TYPES.NOT_STARTED;
      const { container } = render(<TaskState state={STATE} />);
      expect(container.childNodes.length).toEqual(1);
      expect(container.childNodes[0].classList).toContain('hods-tag');
      expect(container.childNodes[0].classList).toContain(`hods-tag--${TaskStates.DETAILS.notStarted.colour}`);
      expect(container.childNodes[0].textContent).toEqual(TaskStates.DETAILS.notStarted.label);
    });

    it('should render a cannot start state icon', () => {
      const STATE = TaskStates.TYPES.CANNOT_START_YET;
      const { container } = render(<TaskState state={STATE} />);
      expect(container.childNodes.length).toEqual(1);
      expect(container.childNodes[0].classList).toContain('hods-tag');
      expect(container.childNodes[0].classList).toContain(`hods-tag--${TaskStates.DETAILS.cannotStartYet.colour}`);
      expect(container.childNodes[0].textContent).toEqual(TaskStates.DETAILS.cannotStartYet.label);
    });

    it('should not render a state if given an unknown value', () => {
      const STATE = 'spellingError';
      const { container } = render(<TaskState state={STATE} />);
      expect(container.childNodes.length).toEqual(0);
    });

    it('should not render a state if given null', () => {
      const STATE = null;
      const { container } = render(<TaskState state={STATE} />);
      expect(container.childNodes.length).toEqual(0);
    });

    it('should not render a state if given undefined', () => {
      const STATE = undefined;
      const { container } = render(<TaskState state={STATE} />);
      expect(container.childNodes.length).toEqual(0);
    });
  });
});
