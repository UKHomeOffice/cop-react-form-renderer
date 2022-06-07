// Global imports
import { createContext, useState } from 'react';

// Local imports
import Utils from '../../utils';

export const ValidationContext = createContext();

const ValidationContextProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const addErrors = async (errors) => {
    setErrors(prev => {
      return [ ...prev, ...errors ].filter(e => !!e);
    });
  };
  const validate = {
    page: (page) => {
      const pageErrors = Utils.Validate.page(page);
      setErrors(pageErrors);
      return pageErrors;
    }
  };
  return (
    <ValidationContext.Provider value={{ errors, addErrors, validate }}>
      {children}
    </ValidationContext.Provider>
  );
};

export default ValidationContextProvider;
