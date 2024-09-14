import {ImageSourcePropType} from 'react-native';

type SearchFilterModalProps = {
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
};

type CompleteProfilePopUpModalProps = {
  openModal: boolean;
  setIsModalOpen: (state: boolean) => void;
  profileNotDoneObject: {
    header: string;
    description: string;
    icon: ImageSourcePropType;
  };
};

export type {SearchFilterModalProps, CompleteProfilePopUpModalProps};
