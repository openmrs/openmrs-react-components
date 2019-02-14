import { format, startOfDay } from 'date-fns';

export const formatDate = (date) => {
  return format(startOfDay(date), 'DD MMM YYYY');
};

export const trimTimeComponentFromISOString = (dateStr) => {
  return dateStr ? dateStr.split("T")[0] : null;
}
