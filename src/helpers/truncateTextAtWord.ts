export const truncateTextAtWord = (text: string, maxLength: number) => {
  if (!text || text.length <= maxLength) {
    return text;
  }

  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  return truncated.substring(
    0,
    lastSpaceIndex > 0 ? lastSpaceIndex : maxLength,
  );
};
