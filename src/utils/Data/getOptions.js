import { Utils } from '@ukhomeoffice/cop-react-components';

const interpolateOptions = (config, options) => {
  return options.map(opt => ({
    ...opt,
    value: Utils.interpolateString(opt.value, config.formData),
    label: Utils.interpolateString(opt.label, config.formData)
  }));
};

const getOptions = (config, callback) => {
  if (config) {
    if (config.options) {
      return callback(interpolateOptions(config, config.options));
    } else if (config.data && config.data.options) {
      return callback(interpolateOptions(config, config.data.options));
    }
  }
  callback([]);
};

export default getOptions;
