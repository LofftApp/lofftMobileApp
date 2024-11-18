import {Dispatch, SetStateAction} from 'react';
import {AdvertFeatures, GetAdvertsParams} from 'reduxFeatures/adverts/types';

interface FeaturesState extends AdvertFeatures {
  selected: boolean;
}

type SearchFilterModalProps = {
  openModal: boolean;
  toggleModal: () => void;
  setSearchTerm: Dispatch<SetStateAction<GetAdvertsParams>>;
  initialFeatures: AdvertFeatures[] | FeaturesState[];
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
};

type ConfirmModalProps = {
  openModal: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  modalAsset: {
    header: string;
    description: string;
    middleText?: string;
    errorMessage?: string;
    buttonText: {
      first: string | JSX.Element;
      second: string | JSX.Element;
    };
  };
  image: JSX.Element;
  onPressFirstButton: () => void;
  fullScreen?: boolean;
  disabled?: boolean;
};

export type {SearchFilterModalProps, ConfirmModalProps, FeaturesState};
