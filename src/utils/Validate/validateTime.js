//Local imports
import { formattedTime } from './additional/utils';

/**
 * Checks if a time passed is a valid time.
 * This will validate for missing components, invalid hour or minute components.
 * EXAMPLE USE : const { message, propsInError } = validateTime('15:30')
 * 
 * Note that an empty string is not considered invalid. You should use
 * validateRequired (Validate.required) for that sort of validation.
 * 
 * @param {string} time time as a string
 * @returns an object with an error message and instructions for which parts of the time are in error
 * or undefined for both if the time is valid
 */
const validateTime = (time) => {
  if (!time) {
    return { message: undefined, propsInError: undefined };
  }

  const formattedDate = formattedTime(time);
  const [hour, minute] = formattedDate.split(':');
  const intHour = parseInt(hour, 10);
  const intMinute = parseInt(minute, 10);

  if (hour.length === 0) {
    return { message: 'Time must include a hour', propsInError: { hour: true } };
  }
  if (intHour > 23 || intHour < 0) {
    return { message: 'Hour must be between 0 and 23', propsInError: { hour: true } };
  }

  if (minute.length === 0) {
    return { message: 'Time must include a minute', propsInError: { minute: true } };
  }

  if (intMinute > 59 || intMinute < 0) {
    return { message: 'Minute must be between 0 and 59', propsInError: { minute: true } };
  }

  return { message: undefined, propsInError: undefined };
};

export default validateTime;
