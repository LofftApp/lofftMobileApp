export const onlyNumber = (value: string) => {
  return Number(value.replace(/\D/g, ''));
};
