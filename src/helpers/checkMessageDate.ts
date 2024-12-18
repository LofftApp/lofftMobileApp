export const checkMessageDate = (inputDate: string): string => {
  const validDateFromDb = new Date(inputDate);
  const today = new Date();

  const isSameDay =
    validDateFromDb.getFullYear() === today.getFullYear() &&
    validDateFromDb.getMonth() === today.getMonth() &&
    validDateFromDb.getDate() === today.getDate();

  if (isSameDay) {
    return `${validDateFromDb.getHours()}:${validDateFromDb.getMinutes().toString().padStart(2, '0')}`;
  }

  return `${validDateFromDb.getDate()}.${validDateFromDb.getMonth() + 1}`;
};
