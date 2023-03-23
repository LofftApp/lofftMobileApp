export const dateFormatConverter = ({date, format = 'EU'}: any) => {
  if (!date) return null;

  if (date?.seconds) {
    date = convertSecondsTODate(date.seconds);
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
