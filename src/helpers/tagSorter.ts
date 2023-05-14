import {useAppSelector} from '@ReduxCore/hooks';

// const userTags = useAppSelector(state => state);

interface Tag {
  name: string;
  emoji: string;
}

export const tagSorter = (userTags: [], flatTags: []) => {
  const positiveTags: any = [];
  const negativeTags: any = [];
  flatTags.forEach((tag: Tag) => {
    const tagFound = userTags.findIndex((userTag: Tag) => {
      return userTag.name === tag.name;
    });
    if (tagFound !== -1) {
      positiveTags.push(tag);
    } else {
      negativeTags.push(tag);
    }
  });
  return [positiveTags, negativeTags];
};
