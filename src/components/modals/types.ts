import {ImageSourcePropType} from 'react-native';

type SearchFilterModalProps = {
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
};

type ConfirmModalProps = {
  openModal: boolean;
  setIsModalOpen: (state: boolean) => void;
  modalAsset: {
    header: string;
    description: string;
    icon: ImageSourcePropType;
    buttonText: {
      first: string;
      second: string;
    };
  };
  onPressFirstButton: () => void;
};

export type {SearchFilterModalProps, ConfirmModalProps};
