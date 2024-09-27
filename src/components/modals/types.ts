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
    middleText?: string;
    buttonText: {
      first: string;
      second: string;
    };
  };
  image: JSX.Element;
  onPressFirstButton: () => void;
  fullScreen?: boolean;
};

export type {SearchFilterModalProps, ConfirmModalProps};
