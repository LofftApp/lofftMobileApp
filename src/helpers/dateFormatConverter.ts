import type {DateFormatConverterArgs} from './types';

export const dateFormatConverter = ({
  date,
  format = 'EU',
}: DateFormatConverterArgs) => {
  if (!date) {
    return;
  }

  if (typeof date === 'object' && 'seconds' in date) {
    date = convertSecondsTODate(date.seconds);
  } else {
    date = new Date(date);
  }

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  switch (format) {
    case 'EU':
      return `${day}/${month}/${year}`;
    case 'US':
      return `${month}/${day}/${year}`;
  }
};

const convertSecondsTODate = (seconds: number) => {
  return new Date(seconds * 1000);
};
