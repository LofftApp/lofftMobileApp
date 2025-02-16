interface ImageToUpload {
  fileName: string;
  fileSize: number;
  height: number;
  type: string;
  uri: string;
  width: number;
}

interface ImageUploadState {
  imagesToUpload: ImageToUpload[];
  savedImages: {
    tenant: {
      userImages: ImageToUpload[];
    };
    lessor: {
      userImages: ImageToUpload[];
      flatImages: ImageToUpload[];
    };
  };
}
type ImageType = 'user' | 'flat';

interface SetSavedImagesPayload {
  userType: 'tenant' | 'lessor';
  imageType: ImageType;
  images: ImageToUpload[];
}

interface DeleteSavedImagePayload {
  userType: 'tenant' | 'lessor';
  imageType: ImageType;
  fileName: string;
}

type ImageToBackend = {
  uri: string;
  type: string;
  name: string;
};

type ImageRecord = {
  blobId: number;
  url: string;
};

export type {
  ImageUploadState,
  ImageToUpload,
  SetSavedImagesPayload,
  DeleteSavedImagePayload,
  ImageType,
  ImageToBackend,
  ImageRecord,
};
