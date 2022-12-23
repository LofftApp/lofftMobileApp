import {useRoute} from '@react-navigation/native';

export const getKeyByValue = (object: any) => {
  const route = useRoute().name;
  const objectKey = Object.keys(object).find(
    (key: any) => object[key].screenName === route,
  );
  return Number(objectKey);
};
