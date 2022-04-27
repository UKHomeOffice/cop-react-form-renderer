// Local imports
import getUpdatedSectionStates from './getUpdatedSectionStates';
import { TaskStates } from '../../../models';

describe('components', () => {
  describe('FormRenderer', () => {
    describe('helpers', () => {
      describe('getUpdatedSectionStates', () => {
        it(`should set all tasks to '${TaskStates.TYPES.CANNOT_START_YET}' excluding the first which should be '${TaskStates.TYPES.NOT_STARTED}'`, () => {
          const SECTIONS = [
            {
              name: 'Add event details',
              tasks: [
                {
                  name: 'Date, location and mode details',
                  pages: ['eventDate', 'eventMode'],
                },
                {
                  name: 'Officer and agency details',
                  pages: ['officeDetails'],
                },
              ],
            },
            {
              name: 'Add people details',
              tasks: [
                {
                  name: 'People details',
                  pages: ['firstName', 'surname'],
                },
                {
                  name: 'Immigration details',
                  pages: ['immigrationDate'],
                },
                {
                  name: 'Journey details',
                  pages: ['journeyDetails'],
                },
              ],
            },
          ];
          const updatedSections = getUpdatedSectionStates(SECTIONS, {});
          expect(updatedSections[0][0].state).toEqual(TaskStates.TYPES.NOT_STARTED);
          expect(updatedSections[0][1].state).toEqual(TaskStates.TYPES.CANNOT_START_YET);
          expect(updatedSections[1][0].state).toEqual(TaskStates.TYPES.CANNOT_START_YET);
          expect(updatedSections[1][1].state).toEqual(TaskStates.TYPES.CANNOT_START_YET);
          expect(updatedSections[1][2].state).toEqual(TaskStates.TYPES.CANNOT_START_YET);
        });

        it(`should set tasks after any '${TaskStates.TYPES.COMPLETE}' ones to '${TaskStates.TYPES.NOT_STARTED}'`, () => {
          const SECTIONS = [
            {
              name: 'Add event details',
              tasks: [
                {
                  name: 'Date, location and mode details',
                  pages: ['eventDate', 'eventMode'],
                },
                {
                  name: 'Officer and agency details',
                  pages: ['officeDetails'],
                },
              ],
            },
          ];
          const TASKS = { 'Date, location and mode details': { complete: true } };
          const updatedSections = getUpdatedSectionStates(SECTIONS, TASKS);
          expect(updatedSections[0][0].state).toEqual(TaskStates.TYPES.COMPLETE);
          expect(updatedSections[0][1].state).toEqual(TaskStates.TYPES.NOT_STARTED);
        });

        it(`should set tasks after any '${TaskStates.TYPES.COMPLETE}' ones to '${TaskStates.TYPES.NOT_STARTED} across different sections'`, () => {
          const SECTIONS = [
            {
              name: 'Add event details',
              tasks: [
                {
                  name: 'Date, location and mode details',
                  pages: ['eventDate', 'eventMode'],
                },
                {
                  name: 'Officer and agency details',
                  pages: ['officeDetails'],
                },
              ],
            },
            {
              name: 'Add people details',
              tasks: [
                {
                  name: 'People details',
                  pages: ['firstName', 'surname'],
                },
                {
                  name: 'Immigration details',
                  pages: ['immigrationDate'],
                },
              ],
            },
          ];
          const TASKS = { 'Date, location and mode details': { complete: true }, 'Officer and agency details': { complete: true } };
          const updatedSections = getUpdatedSectionStates(SECTIONS, TASKS);
          expect(updatedSections[0][0].state).toEqual(TaskStates.TYPES.COMPLETE);
          expect(updatedSections[0][1].state).toEqual(TaskStates.TYPES.COMPLETE);
          expect(updatedSections[1][0].state).toEqual(TaskStates.TYPES.NOT_STARTED);
          expect(updatedSections[1][1].state).toEqual(TaskStates.TYPES.CANNOT_START_YET);
        });

        it(`should set tasks to '${TaskStates.TYPES.IN_PROGRESS}' if they have a current page but are not complete`, () => {
          const SECTIONS = [
            {
              name: 'Add event details',
              tasks: [
                {
                  name: 'Date, location and mode details',
                  pages: ['eventDate', 'eventMode'],
                },
                {
                  name: 'Officer and agency details',
                  pages: ['officeDetails'],
                },
              ],
            },
          ];
          const TASKS = { 'Date, location and mode details': { complete: false, currentPage: 'eventMode' } };
          const updatedSections = getUpdatedSectionStates(SECTIONS, TASKS);
          expect(updatedSections[0][0].state).toEqual(TaskStates.TYPES.IN_PROGRESS);
          expect(updatedSections[0][1].state).toEqual(TaskStates.TYPES.CANNOT_START_YET);
        });
      });
    });
  });
});
