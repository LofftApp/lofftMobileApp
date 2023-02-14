import {getSavedAndAppliedFlats} from '@Api/firebase/firestoreActions';
export const loadFlats = async () => {
  const response = await getSavedAndAppliedFlats();
  return response.map((item: any) => {
    return item.flatId;
  });
};
