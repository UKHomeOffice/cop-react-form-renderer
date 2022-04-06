// Global imports
import { render } from '@testing-library/react';
import React from 'react';

// Local imports
import TaskState from './TaskState';

describe('components', () => {
  describe('TaskList.TaskState', () => {
    it('should render a complete state icon', () => {
      const STATE = 'complete';
      const { container } = render(<TaskState state={STATE} />);
      expect(container.childNodes.length).toEqual(1);
      expect(container.childNodes[0].classList).toContain('hods-tag');
      expect(container.childNodes[0].textContent).toEqual('Completed');
    });

    it('should render an in progress state icon', () => {
      const STATE = 'inProgress';
      const { container } = render(<TaskState state={STATE} />);
      expect(container.childNodes.length).toEqual(1);
      expect(container.childNodes[0].classList).toContain('hods-tag');
      expect(container.childNodes[0].classList).toContain('hods-tag--blue');
      expect(container.childNodes[0].textContent).toEqual('In Progress');
    });

    it('should render a not started state icon', () => {
      const STATE = 'notStarted';
      const { container } = render(<TaskState state={STATE} />);
      expect(container.childNodes.length).toEqual(1);
      expect(container.childNodes[0].classList).toContain('hods-tag');
      expect(container.childNodes[0].classList).toContain('hods-tag--grey');
      expect(container.childNodes[0].textContent).toEqual('Not Started');
    });

    it('should render a cannot start state icon', () => {
      const STATE = 'cannotStartYet';
      const { container } = render(<TaskState state={STATE} />);
      expect(container.childNodes.length).toEqual(1);
      expect(container.childNodes[0].classList).toContain('hods-tag');
      expect(container.childNodes[0].classList).toContain('hods-tag--grey');
      expect(container.childNodes[0].textContent).toEqual('Cannot Start Yet');
    });
  });
});
