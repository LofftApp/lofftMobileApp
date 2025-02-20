import {UserType} from 'reduxFeatures/user/types';

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
  blobId: number;
}

enum ImageSource {
  Saved = 'saved',
  Upload = 'upload',
}

interface SelectedImage extends ImageBase {
  source: ImageSource;
  blobId?: number;
}

type SavedImage = ImageToUpload | ImageRecord | SelectedImage;

interface NewImage extends ImageBase {
  type: string;
  name: string;
}

type BlobId = number;

interface ImagesToBackend {
  existingImages: ImageRecord[];
  newImages: NewImage[];
  deletedImages: BlobId[];
  mainImage: ImageRecord | NewImage;
}

interface ImageUploadState {
  imagesToUpload: ImageToUpload[];
  savedImages: {
    tenant: {
      userImages: SavedImage[];
      avatar: SavedImage | null;
    };
    lessor: {
      userImages: SavedImage[];
      avatar: SavedImage | null;
      flatImages: SavedImage[];
      mainFlatImage: SavedImage | null;
    };
  };
  deletedRecordImages: ImageRecord[];
  selectedImage: SelectedImage | null;
}

enum ImageType {
  User = 'user',
  Flat = 'flat',
}

interface SetSavedImagesPayload {
  userType: UserType;
  imageType: ImageType;
  images: SavedImage[];
  avatar: SavedImage | null;
  mainFlatImage: SavedImage | null;
}

interface DeleteSavedImagePayload {
  userType: UserType;
  imageType: ImageType;
  uri: string;
  blobId?: number;
}

export type {
  ImageUploadState,
  ImageToUpload,
  SetSavedImagesPayload,
  DeleteSavedImagePayload,
  NewImage,
  ImageRecord,
  ImageBase,
  SavedImage,
  SelectedImage,
  BlobId,
  ImagesToBackend,
};
export {ImageType, ImageSource};
