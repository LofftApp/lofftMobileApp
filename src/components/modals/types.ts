import {Dispatch, SetStateAction} from 'react';
import {AdvertFeatures} from 'reduxFeatures/adverts/types';

type SearchTermType = {
  features?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
};
interface FeaturesState extends AdvertFeatures {
  selected: boolean;
}

type SearchFilterModalProps = {
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
  setSearchTerm: Dispatch<SetStateAction<SearchTermType | undefined>>;
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

export type {
  SearchFilterModalProps,
  ConfirmModalProps,
  SearchTermType,
  FeaturesState,
};
