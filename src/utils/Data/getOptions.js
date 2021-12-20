// Local imports
import getRefData from './refData';

const getOptions = (config, callback) => {
  if (!config) {
    callback([]);
  } else if (config.options) {
    callback(config.options);
  } else if (config.url) {
    const options = getRefData(config.url).map(opt => {
      return {
        ...opt,
        value: opt.id || opt.value,
        label: opt.name || opt.label
      };
    });
    callback(options);
  }
};

export default getOptions;
