import type {Tag} from 'helpers/types';

export const tagSorter = (userTags: Tag[], flatTags: Tag[]) => {
  const positiveTags: Tag[] = [];
  const negativeTags: Tag[] = [];

  if (!flatTags) {
    return {positiveTags, negativeTags};
  }

  flatTags.forEach((tag: Tag) => {
    if (!userTags) {
      return;
    }
    const tagFound = userTags.findIndex((userTag: Tag) => {
      return userTag?.name === tag?.name;
    });
    if (tagFound !== -1) {
      positiveTags.push(tag);
    } else {
      negativeTags.push(tag);
    }
  });
  return {positiveTags, negativeTags};
};
