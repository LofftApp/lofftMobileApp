export const isPriceValid = (minPrice: string, maxPrice: string) => {
  const min = +minPrice;
  const max = +maxPrice;
  return min <= max && min >= 0 && max >= 0;
};
