// Global imports
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

// Local imports
import { TaskStates } from '../../models';
import Task from './Task';

describe('components', () => {
  describe('TaskList.Task', () => {
    it('should render a task', () => {
      const STATE = TaskStates.TYPES.COMPLETE;
      const TASK = { name: 'taskName', pages: ['pageName'], state: STATE };
      const ON_CLICK = () => {};
      const { container } = render(<Task task={TASK} onClick={ON_CLICK} />);
      expect(container.childNodes.length).toEqual(1);
      expect(container.childNodes[0].classList).toContain('hods-task-list__item');

      const span = container.childNodes[0].childNodes[0];
      const state = container.childNodes[0].childNodes[1];
      expect(span.classList).toContain('hods-task-list__task-name');
      expect(state.textContent).toEqual('Completed');
    });

    it('should render a task with inactive link if state is cannotStartYet', () => {
      const NAME = 'taskName';
      const STATE =  TaskStates.TYPES.CANNOT_START_YET;
      const TASK = { name: 'taskName', pages: ['pageName'], state: STATE };
      const ON_CLICK = () => {};
      const { container } = render(<Task task={TASK} onClick={ON_CLICK} />);
      const span = container.childNodes[0].childNodes[0];
      expect(span.childNodes[0].tagName).toEqual(undefined);
      expect(span.textContent).toEqual(NAME);
    });

    it('should render a task with a link if state is not cannotStartYet', () => {
      const STATE =  TaskStates.TYPES.IN_PROGRESS;
      const TASK = { name: 'taskName', pages: ['pageName'], state: STATE };
      const ON_CLICK = () => {};
      const { container } = render(<Task task={TASK} onClick={ON_CLICK} />);
      const span = container.childNodes[0].childNodes[0];
      expect(span.childNodes.length).toEqual(1);
      expect(span.childNodes[0].tagName).toEqual('A');
    });

    it('should call then given onClick function when the link is clicked', () => {
      const STATE =  TaskStates.TYPES.IN_PROGRESS;
      const TASK = { name: 'taskName', pages: ['pageName'], state: STATE };
      const ON_CLICK_CALLS = [];
      const ON_CLICK = (value) => {
        ON_CLICK_CALLS.push(value);
      };
      const { container } = render(<Task task={TASK} onClick={ON_CLICK} />);
      const link = container.childNodes[0].childNodes[0].childNodes[0];
      fireEvent.click(link);

      expect(ON_CLICK_CALLS.length).toEqual(1);
      expect(ON_CLICK_CALLS[0]).toEqual({ pages: ['pageName'], name: "taskName", state: STATE});
    });
  });
});
