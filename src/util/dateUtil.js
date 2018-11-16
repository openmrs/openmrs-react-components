import moment from 'moment';

export const formatDate = (date) => {
  return moment(date).startOf('day').format('DD MMM YYYY');
}
