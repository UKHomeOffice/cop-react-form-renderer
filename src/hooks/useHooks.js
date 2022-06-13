// Global imports
import { useContext } from 'react';

// Local imports
import { HooksContext } from '../context/HooksContext';

const useHooks = () => {
  return useContext(HooksContext);
};

export default useHooks;
