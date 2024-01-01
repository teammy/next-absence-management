import dayjs from "dayjs";
import buddhistEra from 'dayjs/plugin/buddhistEra'
dayjs.extend(buddhistEra)

export const toDateString = (date: string | number | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};


export const convertDateToFormatNormal = (date: string | number | Date | null) => {
  return dayjs(date).format("YYYY-MM-DD");
}

export const convertDateToThaiShortMonth =  (date: string | number | Date | null) => {
  return  dayjs(date).format("D MMM BBBB")
}