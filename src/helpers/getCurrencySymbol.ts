export const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'eur':
      return '€';
    case 'usd':
      return '$';
    case 'gbp':
      return '£';
    default:
      return currency;
  }
};
