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
}
export type {ImageUploadState, ImageToUpload};
