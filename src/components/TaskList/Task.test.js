// Global imports
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

// Local imports
import Task from './Task';

describe('components', () => {
  describe('TaskList.Task', () => {
    it('should render a task', () => {
      const NAME = 'taskName';
      const STATE = 'complete';
      const { container } = render(<Task taskName={NAME} state={STATE} />);
      expect(container.childNodes.length).toEqual(1);
      expect(container.childNodes[0].classList).toContain('app-task-list__item');

      const span = container.childNodes[0].childNodes[0];
      const state = container.childNodes[0].childNodes[1];
      expect(span.classList).toContain('app-task-list__task-name');
      expect(state.textContent).toEqual('Completed');
    });

    it('should render a task with inactive link if state is cannotStartYet', () => {
      const NAME = 'taskName';
      const STATE = 'cannotStartYet';
      const { container } = render(<Task taskName={NAME} state={STATE} />);
      const span = container.childNodes[0].childNodes[0];
      expect(span.childNodes[0].tagName).toEqual(undefined);
      expect(span.textContent).toEqual(NAME);
    });

    it('should render a task with a link if state is not cannotStartYet', () => {
      const NAME = 'taskName';
      const STATE = 'inProgress';
      const { container } = render(<Task taskName={NAME} state={STATE} />);
      const span = container.childNodes[0].childNodes[0];
      expect(span.childNodes.length).toEqual(1);
      expect(span.childNodes[0].tagName).toEqual('A');
    });

    it('should call then given onClick function when the link is clicked', () => {
      const NAME = 'taskName';
      const STATE = 'inProgress';
      const ON_CLICK_CALLS = [];
      const ON_CLICK = (value) => {
        ON_CLICK_CALLS.push(value);
      };
      const { container } = render(<Task taskName={NAME} state={STATE} onClick={ON_CLICK} />);
      const link = container.childNodes[0].childNodes[0].childNodes[0];
      fireEvent.click(link);

      expect(ON_CLICK_CALLS.length).toEqual(1);
      expect(ON_CLICK_CALLS[0]).toEqual(NAME);
    });
  });
});
