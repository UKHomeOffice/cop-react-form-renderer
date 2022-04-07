// Global imports
import { render } from '@testing-library/react';
import React from 'react';

// Local imports
import TaskList from './TaskList';

describe('components', () => {
  describe('TaskList', () => {
    it('should render a TaskList', () => {
      const COP_REF = '123';
      const sections = [
        {
          sectionName: 'These are your tasks',
          tasks: [
            { taskName: 'Nice task', state: 'complete' },
            { taskName: 'Ok task', state: 'inProgress' },
            { taskName: 'Terrible task', state: 'notStarted' },
          ],
        },
        {
          sectionName: 'These are your extra bonus tasks',
          tasks: [
            { taskName: 'Nice task', state: 'complete' },
            { taskName: 'Ok task', state: 'cannotStartYet' },
            { taskName: 'Terrible task', state: 'cannotStartYet' },
          ],
        },
      ];
      const { container } = render(<TaskList copRefNum={COP_REF} sections={sections} />);
      expect(container.childNodes.length).toEqual(1);

      const referenceHeading = container.childNodes[0].childNodes[0];
      expect(referenceHeading.tagName).toEqual('H2');
      expect(referenceHeading.textContent).toEqual('COP reference number 123');

      const incompleteForm = container.childNodes[0].childNodes[1];
      expect(incompleteForm.tagName).toEqual('H2');
      expect(incompleteForm.textContent).toEqual('Incomplete form');

      const numComplete = container.childNodes[0].childNodes[2];
      expect(numComplete.tagName).toEqual('P');
      expect(numComplete.textContent).toEqual('You have completed 2 of 6 sections');

      expect(container.childNodes[0].childNodes.length).toEqual(7); 

      const subSectionOneHeading = container.childNodes[0].childNodes[3];
      expect(subSectionOneHeading.tagName).toEqual('H2');
      expect(subSectionOneHeading.textContent).toEqual('1. These are your tasks');
      const subSectionOneList = container.childNodes[0].childNodes[4];
      expect(subSectionOneList.childNodes.length).toEqual(3);

      const subSectionTwoHeading = container.childNodes[0].childNodes[5];
      expect(subSectionTwoHeading.tagName).toEqual('H2');
      expect(subSectionTwoHeading.textContent).toEqual('2. These are your extra bonus tasks');

      const subSectionTwoList = container.childNodes[0].childNodes[6];
      expect(subSectionTwoList.childNodes.length).toEqual(3);
    });

    it('should not show incomplete form if form is complete', () => {
      const COP_REF = '123';
      const sections = [
        {
          sectionName: 'These are your tasks',
          tasks: [
            { taskName: 'Nice task', state: 'complete' },
            { taskName: 'Ok task', state: 'complete' },
            { taskName: 'Terrible task', state: 'complete' },
          ],
        },
        {
          sectionName: 'These are your extra bonus tasks',
          tasks: [
            { taskName: 'Nice task', state: 'complete' },
            { taskName: 'Ok task', state: 'complete' },
            { taskName: 'Terrible task', state: 'complete' },
          ],
        },
      ];
      const { container } = render(<TaskList copRefNum={COP_REF} sections={sections} />);
      expect(container.childNodes[0].childNodes.length).toEqual(6);

      const referenceHeading = container.childNodes[0].childNodes[0];
      expect(referenceHeading.tagName).toEqual('H2');
      expect(referenceHeading.textContent).toEqual('COP reference number 123');

      const numComplete = container.childNodes[0].childNodes[1];
      expect(numComplete.tagName).toEqual('P');
      expect(numComplete.textContent).toEqual('You have completed 6 of 6 sections');
    });

    it('should not show numbers on section headings if there is only one section', () => {
      const COP_REF = '123';
      const sections = [
        {
          sectionName: 'These are your tasks',
          tasks: [
            { taskName: 'Nice task', state: 'complete' },
            { taskName: 'Ok task', state: 'complete' },
            { taskName: 'Terrible task', state: 'notStarted' },
          ],
        },
      ];
      const { container } = render(<TaskList copRefNum={COP_REF} sections={sections} />);
      const subSectionOne = container.childNodes[0].childNodes[3];
      expect(subSectionOne.childNodes[0].textContent).toEqual('These are your tasks');
    });
  });
});
