export const findStyleInArray = (styles: any[], styleName: string) => {
  const styleObject = styles.find((style: any) =>
    style.hasOwnProperty(styleName),
  );
  return styleObject ? styleObject[styleName] : null;
};
