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

interface SelectedImage extends ImageBase {
  source: 'saved' | 'upload';
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
    };
    lessor: {
      userImages: SavedImage[];
      flatImages: SavedImage[];
    };
  };
  deletedRecordImages: ImageRecord[];
  selectedImage: SelectedImage | null;
}
type ImageType = 'user' | 'flat';

interface SetSavedImagesPayload {
  userType: 'tenant' | 'lessor';
  imageType: ImageType;
  images: SavedImage[];
}

interface DeleteSavedImagePayload {
  userType: 'tenant' | 'lessor';
  imageType: ImageType;
  uri: string;
  blobId?: number;
}

export type {
  ImageUploadState,
  ImageToUpload,
  SetSavedImagesPayload,
  DeleteSavedImagePayload,
  ImageType,
  NewImage,
  ImageRecord,
  ImageBase,
  SavedImage,
  SelectedImage,
  BlobId,
  ImagesToBackend,
};
