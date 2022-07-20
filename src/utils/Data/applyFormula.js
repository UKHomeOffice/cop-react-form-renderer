// Global imports
import { Utils } from '@ukhomeoffice/cop-react-components';

const applyFormula = (config) => {
  try {
    const result = simplify(config);
    return (!result && result !== 0) ? '' : result;
  } catch (err) {
    console.error(err.message);
  }
  return '';
}

const simplify = (config) => {
  if (!config || !config.formula) {
    throw new Error(`Missing 'formula' definition`);
  }
  const { name } = {...config.formula};
  switch (name) {
    case 'multiply':
      return reduceNumber(config, (t, c) => t * c);
    case 'divide':
      return reduceNumber(config, (t, c) => t / c);
    case 'plus':
      return reduceNumber(config, (t, c) => t + c);
    case 'minus':
      return reduceNumber(config, (t, c) => t - c);
    default:
      throw new Error(!name ? 
        `Calculation formula 'name' cannot be empty` : 
        `Unsupported operation '${name}'`);
  }
}

const reduceNumber = (config, reduction) => {
  const { args } = {...config.formula};
  if (args.length < 2) {
    throw new Error('Requires more than one argument for calculation');
  }
  return round(args
    .map(a => getValue(a, config.formData))
    .reduce( (total, current, index) => index === 0 ? current : reduction(total, current), 0), config);
}

const round = (number, config) => {
  const round = config.formula.round;
  if ((!round && round !== 0) || !number) return number;
  if (round === 0) {
    return parseInt(number);
  } else {
    const precisionScale = Math.pow(10, round);
    return  Math.round((number + Number.EPSILON) * precisionScale) / precisionScale;
  } 
}

const getValue = (arg, formData) => {
  const keys = Object.keys(arg);
  if (keys.length === 1) {
    const key = keys[0];
    const val = arg[key];
    switch (key) {
      case 'field':
        const fieldVal = fieldValue(val, formData);
        return (!fieldVal && fieldVal !== 0) ? NaN : parseFloat(fieldVal);
      case 'value':
        return parseFloat(val);
      case 'formula':
        return applyFormula({...arg, formData});
      default:
        throw new Error('Only accept following as argument field: {field, value, or formula}');
    }
  } else {
    throw new Error('Argument cannot have more than one reference');
  }
}

const fieldValue = (field, data) => {
  return Utils.interpolateString('${' + field + '}', data);
}

export default applyFormula;
