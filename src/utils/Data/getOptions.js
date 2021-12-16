const getOptions = (config, callback) => {
  if (config) {
    if (config.options) {
      return callback(config.options);
    } else if (config.data && config.data.options) {
      return callback(config.data.options);
    }
  }
  callback([]);
};

export default getOptions;
