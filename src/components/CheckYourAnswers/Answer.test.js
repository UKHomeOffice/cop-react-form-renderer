// Global imports
import { DEFAULT_CLASS as DEFAULT_READONLY_CLASS } from '@ukhomeoffice/cop-react-components/dist/Readonly';
import React from 'react';
import { renderWithValidation } from '../../setupTests';

// Local imports
import Answer from './Answer';

describe('components', () => {

  describe('CheckYourAnswers.Answer', () => {

    it('should handle a null value', async () => {
      const VALUE = null;
      const COMPONENT = null;
      const { container } = renderWithValidation(
        <Answer value={VALUE} component={COMPONENT} />
      );
      expect(container.childNodes.length).toEqual(1);
      expect(container.childNodes[0].textContent).toEqual('No answer');
    });

    it('should handle a null component', async () => {
      const VALUE = 'Alpha';
      const COMPONENT = null;
      const { container } = renderWithValidation(
        <Answer value={VALUE} component={COMPONENT} />
      );
      expect(container.textContent).toEqual(VALUE);
    });

    it('should handle a component', async () => {
      const VALUE = 'Bravo';
      const COMPONENT = { id: 'alpha', fieldId: 'alpha', type: 'text', label: 'Alpha' };
      const { container } = renderWithValidation(
        <Answer value={VALUE} component={COMPONENT} />
      );
      const answer = container.childNodes[0];
      expect(answer.tagName).toEqual('DIV');
      expect(answer.classList).toContain(DEFAULT_READONLY_CLASS);
      expect(answer.textContent).toEqual(VALUE);
    });
    
  });

});
