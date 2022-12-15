export const dateFormatConverter = ({date, format = 'EU'}) => {
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
