import {Dispatch, SetStateAction} from 'react';

type SearchFilterModalProps = {
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
};

type ConfirmModalProps = {
  openModal: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  modalAsset: {
    header: string;
    description: string;
    middleText?: string;
    buttonText: {
      first: string;
      second: string;
    };
  };
  image: JSX.Element;
  onPressFirstButton: () => void;
  fullScreen?: boolean;
  disabled?: boolean;
};

export type {SearchFilterModalProps, ConfirmModalProps};
