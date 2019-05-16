import { format, startOfDay, parse } from 'date-fns';

export const formatDate = (date) => {
  return format(startOfDay(date), 'DD MMM YYYY');
};

export const formatDatetime = (date) => {
  return format(date, 'DD MMM YYYY  h:mm a');
};


export const hasTimeComponent = (date) => {
  return (startOfDay(date) - parse(date)) !== 0;
};

export const trimTimeComponentFromISOString = (dateStr) => {
  return dateStr ? dateStr.split("T")[0] : null;
}
