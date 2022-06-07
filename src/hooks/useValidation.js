// Global imports
import { useContext } from 'react';

// Local imports
import { ValidationContext } from '../context/ValidationContext';

const useValidation = () => {
  return useContext(ValidationContext);
};

export default useValidation;
