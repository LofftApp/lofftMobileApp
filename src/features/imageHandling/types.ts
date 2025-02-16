interface ImageBase {
  uri: string;
}

interface ImageToUpload extends ImageBase {
  fileName: string;
  fileSize: number;
  height: number;
  type: string;
  width: number;
}

interface ImageRecord extends ImageBase {
  blobId: string;
}

type SavedImage = ImageToUpload | ImageRecord;

interface ImageToBackend extends ImageBase {
  type: string;
  name: string;
}

interface ImageUploadState {
  imagesToUpload: ImageToUpload[];
  savedImages: {
    tenant: {
      userImages: SavedImage[];
    };
    lessor: {
      userImages: SavedImage[];
      flatImages: SavedImage[];
    };
  };
}
type ImageType = 'user' | 'flat';

interface SetSavedImagesPayload {
  userType: 'tenant' | 'lessor';
  imageType: ImageType;
  images: ImageToUpload[] | ImageRecord[];
}

interface DeleteSavedImagePayload {
  userType: 'tenant' | 'lessor';
  imageType: ImageType;
  uri: string;
}

export type {
  ImageUploadState,
  ImageToUpload,
  SetSavedImagesPayload,
  DeleteSavedImagePayload,
  ImageType,
  ImageToBackend,
  ImageRecord,
  ImageBase,
};
