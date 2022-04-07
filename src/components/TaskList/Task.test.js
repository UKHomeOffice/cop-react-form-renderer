// Global imports
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

// Local imports
import Task from './Task';

describe('components', () => {
  describe('TaskList.Task', () => {
    it('should render a task', () => {
      const STATE = 'complete';
      const TASK = { taskName: 'taskName', firstPage: 'pageName' };
      const ON_CLICK = () => {};
      const { container } = render(<Task task={TASK} state={STATE} onClick={ON_CLICK} />);
      expect(container.childNodes.length).toEqual(1);
      expect(container.childNodes[0].classList).toContain('hods-task-list__item');

      const span = container.childNodes[0].childNodes[0];
      const state = container.childNodes[0].childNodes[1];
      expect(span.classList).toContain('hods-task-list__task-name');
      expect(state.textContent).toEqual('Completed');
    });

    it('should render a task with inactive link if state is cannotStartYet', () => {
      const NAME = 'taskName';
      const STATE = 'cannotStartYet';
      const TASK = { taskName: 'taskName', firstPage: 'pageName' };
      const ON_CLICK = () => {};
      const { container } = render(<Task task={TASK} state={STATE} onClick={ON_CLICK} />);
      const span = container.childNodes[0].childNodes[0];
      expect(span.childNodes[0].tagName).toEqual(undefined);
      expect(span.textContent).toEqual(NAME);
    });

    it('should render a task with a link if state is not cannotStartYet', () => {
      const STATE = 'inProgress';
      const TASK = { taskName: 'taskName', firstPage: 'pageName' };
      const ON_CLICK = () => {};
      const { container } = render(<Task task={TASK} state={STATE} onClick={ON_CLICK} />);
      const span = container.childNodes[0].childNodes[0];
      expect(span.childNodes.length).toEqual(1);
      expect(span.childNodes[0].tagName).toEqual('A');
    });

    it('should call then given onClick function when the link is clicked', () => {
      const STATE = 'inProgress';
      const TASK = { taskName: 'taskName', firstPage: 'pageName' };
      const ON_CLICK_CALLS = [];
      const ON_CLICK = (value) => {
        ON_CLICK_CALLS.push(value);
      };
      const { container } = render(<Task task={TASK} state={STATE} onClick={ON_CLICK} />);
      const link = container.childNodes[0].childNodes[0].childNodes[0];
      fireEvent.click(link);

      expect(ON_CLICK_CALLS.length).toEqual(1);
      expect(ON_CLICK_CALLS[0]).toEqual('pageName');
    });
  });
});
