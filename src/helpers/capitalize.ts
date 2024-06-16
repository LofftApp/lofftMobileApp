export const capitalize = (word: string | undefined) => {
  if (!word) {
    return '';
  }
  return word.charAt(0).toUpperCase() + word.substring(1);
};
