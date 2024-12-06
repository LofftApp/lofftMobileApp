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

interface SetSavedImagesPayload {
  userType: 'tenant' | 'lessor';
  imageType: 'user' | 'flat';
  images: ImageToUpload[];
}

interface DeleteSavedImagePayload {
  userType: 'tenant' | 'lessor';
  imageType: 'user' | 'flat';
  fileName: string;
}
export type {
  ImageUploadState,
  ImageToUpload,
  SetSavedImagesPayload,
  DeleteSavedImagePayload,
};
