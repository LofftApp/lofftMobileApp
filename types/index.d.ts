
declare module '*.jpeg';

declare module '*.png' {
  const content: ImageSourcePropType;
  export default content;
}
