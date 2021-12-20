// Local imports
import getOptions from './getOptions';

const getAutocompleteSource = (config) => {
  let options = [];
  if (config) {
    getOptions(config.data, (val) => {
      options = val;
    });
  }
  return (query, populateResults) => {
    const lcQuery = query ? query.toLowerCase() : '';
    populateResults(options.filter(opt => {
      const lcLabel = opt.label ? opt.label.toLowerCase() : '';
      return lcLabel.includes(lcQuery);
    }));
  };
}

export default getAutocompleteSource;
