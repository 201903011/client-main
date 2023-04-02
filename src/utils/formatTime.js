import { format, getTime, formatDistanceToNow, differenceInCalendarDays } from 'date-fns';
import moment from 'moment/moment';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd/MM/yyyy');
}

export function fDateCustom(date) {
  // console.log(date);
  const dateobj = moment(date, 'DD/MM/YYYY').toDate();
  console.log(dateobj.toISOString());
  // const dateParts = date.split('/');

  // // month is 0-based, that's why we need dataParts[1] - 1
  // const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

  return format(new Date(dateobj.toISOString()), 'dd/MM/yyyy');
}

export function fDateCustomISO(date) {
  return format(new Date(date), 'dd/MM/yyyy');
}

export function fDateDifference(date1, date2) {
  // console.log(date);
  let ans = 0;
  const d1 = new Date(moment(date1, 'DD/MM/YYYY').toDate().toISOString());
  const d2 = new Date(moment(date2, 'DD/MM/YYYY').toDate().toISOString());
  ans = differenceInCalendarDays(d1, d2);

  return ans;
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
