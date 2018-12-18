import { format, startOfDay } from 'date-fns';

export const formatDate = (date) => {
  return format(startOfDay(date), 'DD MMM YYYY');
}
