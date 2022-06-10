// Global imports
import { render } from '@testing-library/react';
import { ErrorSummary } from '@ukhomeoffice/cop-react-components';
import React, { useEffect } from 'react';

// Local imports
import { useValidation } from '../../hooks';
import ValidationContextProvider from './ValidationContext';

const TestComponent = ({ customErrors }) => {
  const { addErrors, clearErrors, errors, validate } = useValidation();
  useEffect(() => {
    if (customErrors) {
      addErrors(customErrors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customErrors]);
  return (
    <>
      {typeof (addErrors) === 'function' && <span>addErrors is a function</span>}
      {typeof (clearErrors) === 'function' && <span>clearErrors is a function</span>}
      {typeof (validate.page) === 'function' && <span>validate.page is a function</span>}
      {Array.isArray(errors) && <span>errors is an array of length {errors.length}</span>}
      {errors?.length > 0 && <ErrorSummary errors={errors} />}
    </>
  );
};

describe('context.ValidationContext', () => {

  it('should appropriately set up the context', async () => {
    const { container } = render(
      <ValidationContextProvider>
        <TestComponent />
      </ValidationContextProvider>
    );
    expect(container.childNodes.length).toEqual(4);
    expect(container.textContent).toContain('addErrors is a function');
    expect(container.textContent).toContain('clearErrors is a function');
    expect(container.textContent).toContain('validate.page is a function');
    expect(container.textContent).toContain('errors is an array of length 0');
  });

  it('should appropriately handle errors', async () => {
    const CUSTOM_ERRORS = [
      { id: 'alpha', error: 'Alpha is required' }
    ];
    const { container } = render(
      <ValidationContextProvider>
        <TestComponent customErrors={CUSTOM_ERRORS} />
      </ValidationContextProvider>
    );
    expect(container.childNodes.length).toEqual(5);
    expect(container.textContent).toContain('addErrors is a function');
    expect(container.textContent).toContain('clearErrors is a function');
    expect(container.textContent).toContain('validate.page is a function');
    expect(container.textContent).toContain('errors is an array of length 1');
    const errorSummary = container.childNodes[4];
    expect(errorSummary.tagName).toEqual('DIV');
    expect(errorSummary.classList).toContain('govuk-error-summary');
    expect(errorSummary.textContent).toContain(CUSTOM_ERRORS[0].error);
  });

});
