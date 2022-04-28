import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { DATE_FORMAT } from './utils';
import runAdditionalComponentValidation from './index';

dayjs.extend(customParseFormat);

describe('utils', () => {
  describe('Validate', () => {
    describe('additional', () => {
      it('should apply optional validators when specified', () => {
        const COMPONENT = {
          additionalValidation: [
            { function: 'mustBeAfter', value: 3, unit: 'day', message: 'Date must be more than 3 days in the future' },
          ],
        };
        const VALUE = dayjs().add(1, 'day').format(DATE_FORMAT);
        expect(runAdditionalComponentValidation(COMPONENT, VALUE)).toEqual(
          'Date must be more than 3 days in the future'
        );
      });

      it('should apply multiple optional validators when specified', () => {
        const COMPONENT = {
          additionalValidation: [
            {
              function: 'mustBeAfter',
              value: 100,
              unit: 'day',
              message: 'Date must be more than 100 days in the future',
            },
            {
              function: 'mustBeBefore',
              value: 200,
              unit: 'day',
              message: 'Date must be less than 200 days in the future',
            },
          ],
        };
        const VALUE = dayjs().add(250, 'day').format(DATE_FORMAT);
        expect(runAdditionalComponentValidation(COMPONENT, VALUE)).toEqual(
          'Date must be less than 200 days in the future'
        );
      });

      it('should apply multiple optional validators when specified and return undefined if all are passed', () => {
        const COMPONENT = {
          additionalValidation: [
            {
              function: 'mustBeAfter',
              value: 100,
              unit: 'day',
              message: 'Date must be more than 100 days in the future',
            },
            {
              function: 'mustBeBefore',
              value: 200,
              unit: 'day',
              message: 'Date must be less than 200 days in the future',
            },
            { function: 'mustBeInTheFuture', message: 'Date must be in the future' },
          ],
        };
        const VALUE = dayjs().add(150, 'day').format(DATE_FORMAT);
        expect(runAdditionalComponentValidation(COMPONENT, VALUE)).toEqual(undefined);
      });
    });
  });
});
