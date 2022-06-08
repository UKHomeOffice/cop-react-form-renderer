// Global imports
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

// Local imports
import TaskList from './TaskList';

describe('components', () => {
  describe('TaskList', () => {
    it('should render a TaskList', () => {
      const COP_REF = '123';
      const REF_TITLE = 'COP reference number';
      const sections = [
        {
          name: 'These are your tasks',
          tasks: [
            { name: 'Nice task', state: 'complete', pages: ['pageOne'] },
            { name: 'Ok task', state: 'inProgress', pages: ['pageTwo'] },
            { name: 'Terrible task', state: 'notStarted', pages: ['pageThree'] },
          ],
        },
        {
          name: 'These are your extra bonus tasks',
          tasks: [
            { name: 'Nice task', state: 'complete', pages: ['pageFour'] },
            { name: 'Ok task', state: 'cannotStartYet', pages: ['pageFive'] },
            { name: 'Terrible task', state: 'cannotStartYet', pages: ['pageSix'] },
          ],
        },
      ];
      const { container } = render(<TaskList refNumber={COP_REF} refTitle={REF_TITLE} sections={sections} />);
      expect(container.childNodes.length).toEqual(1);

      const referenceHeading = container.childNodes[0].childNodes[0];
      expect(referenceHeading.tagName).toEqual('H2');
      expect(referenceHeading.textContent).toEqual('COP reference number');

      const referenceNumber = container.childNodes[0].childNodes[1];
      expect(referenceNumber.tagName).toEqual('H2');
      expect(referenceNumber.textContent).toEqual('123');

      const incompleteForm = container.childNodes[0].childNodes[2];
      expect(incompleteForm.tagName).toEqual('H2');
      expect(incompleteForm.textContent).toEqual('Incomplete form');

      const numComplete = container.childNodes[0].childNodes[3];
      expect(numComplete.tagName).toEqual('P');
      expect(numComplete.textContent).toEqual('You have completed 2 of 6 sections');

      expect(container.childNodes[0].childNodes.length).toEqual(8);

      const subSectionOneHeading = container.childNodes[0].childNodes[4];
      expect(subSectionOneHeading.tagName).toEqual('H2');
      expect(subSectionOneHeading.textContent).toEqual('1. These are your tasks');
      const subSectionOneList = container.childNodes[0].childNodes[5];
      expect(subSectionOneList.childNodes.length).toEqual(3);

      const subSectionTwoHeading = container.childNodes[0].childNodes[6];
      expect(subSectionTwoHeading.tagName).toEqual('H2');
      expect(subSectionTwoHeading.textContent).toEqual('2. These are your extra bonus tasks');

      const subSectionTwoList = container.childNodes[0].childNodes[7];
      expect(subSectionTwoList.childNodes.length).toEqual(3);
    });

    it('should not show incomplete form if form is complete', () => {
      const COP_REF = '123';
      const REF_TITLE = 'COP reference number';
      const sections = [
        {
          name: 'These are your tasks',
          tasks: [
            { name: 'Nice task', state: 'complete', pages: ['pageOne'] },
            { name: 'Ok task', state: 'complete', pages: ['pageTwo'] },
            { name: 'Terrible task', state: 'complete', pages: ['pageThree'] },
          ],
        },
        {
          name: 'These are your extra bonus tasks',
          tasks: [
            { name: 'Nice task', state: 'complete', pages: ['pageFour'] },
            { name: 'Ok task', state: 'complete', pages: ['pageFive'] },
            { name: 'Terrible task', state: 'complete', pages: ['pageSix'] },
          ],
        },
      ];
      const { container } = render(<TaskList refNumber={COP_REF} refTitle={REF_TITLE} sections={sections} />);
      expect(container.childNodes[0].childNodes.length).toEqual(7);

      const referenceHeading = container.childNodes[0].childNodes[0];
      expect(referenceHeading.tagName).toEqual('H2');
      expect(referenceHeading.textContent).toEqual('COP reference number');

      const referenceNumber = container.childNodes[0].childNodes[1];
      expect(referenceNumber.tagName).toEqual('H2');
      expect(referenceNumber.textContent).toEqual('123');

      const numComplete = container.childNodes[0].childNodes[2];
      expect(numComplete.tagName).toEqual('P');
      expect(numComplete.textContent).toEqual('You have completed 6 of 6 sections');
    });

    it('should not show numbers on section headings if there is only one section', () => {
      const COP_REF = '123';
      const REF_TITLE = 'COP reference number';
      const sections = [
        {
          name: 'These are your tasks',
          tasks: [
            { name: 'Nice task', state: 'complete', pages: ['pageOne'] },
            { name: 'Ok task', state: 'complete', pages: ['pageTwo'] },
            { name: 'Terrible task', state: 'notStarted', pages: ['pageThree'] },
          ],
        },
      ];
      const { container } = render(<TaskList refNumber={COP_REF} refTitle={REF_TITLE} sections={sections} />);
      const subSectionOne = container.childNodes[0].childNodes[4];
      expect(subSectionOne.childNodes[0].textContent).toEqual('');
      expect(subSectionOne.childNodes[1].textContent).toEqual('These are your tasks');
    });
  });

  it('should pass the the selected task to the given onTaskAction function', () => {
    const COP_REF = '123';
    const REF_TITLE = 'COP reference number';
    const ON_CLICK_CALLS = [];
    const ON_CLICK = (value) => {
      ON_CLICK_CALLS.push(value);
    };
    const sections = [
      {
        name: 'These are your tasks',
        tasks: [
          { name: 'Nice task', state: 'complete', pages: ['pageOne'] },
          { name: 'Ok task', state: 'complete', pages: ['pageTwo'] },
          { name: 'Terrible task', state: 'notStarted', pages: ['pageThree'] },
        ],
      },
    ];
    const { container } = render(<TaskList refNumber={COP_REF} refTitle={REF_TITLE} sections={sections} onTaskAction={ON_CLICK}/>);

    const firstTask = container.childNodes[0].childNodes[5].childNodes[0].childNodes[0].childNodes[0];
    const secondTask = container.childNodes[0].childNodes[5].childNodes[1].childNodes[0].childNodes[0];
    const thirdTask = container.childNodes[0].childNodes[5].childNodes[2].childNodes[0].childNodes[0];

    fireEvent.click(firstTask.childNodes[0]);
    expect(ON_CLICK_CALLS[0]).toEqual({ pages: ['pageOne'], name: "Nice task", state: 'complete'});

    fireEvent.click(secondTask.childNodes[0]);
    expect(ON_CLICK_CALLS[1]).toEqual({pages: ['pageTwo'], name: "Ok task", state: 'complete'});

    fireEvent.click(thirdTask.childNodes[0]);
    expect(ON_CLICK_CALLS[2]).toEqual({pages: ['pageThree'], name: "Terrible task", state: 'notStarted'});

  });
});
