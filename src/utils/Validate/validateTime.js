//Local imports
import { formatTimeString } from './additional/utils';

const validateTime = (time) => {
  const formattedDate = formatTimeString(time);
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
